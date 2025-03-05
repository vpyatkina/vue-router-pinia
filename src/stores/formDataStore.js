import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export const useFormDataStore = defineStore('formData', () => {
  const formData = ref({})
  async function uploadFormData() {
    const files = formData.value.files
    console.log(files)
    const fileUrls = []
    if (files) {
      files.forEach(async (file) => {
        const { data, error: bucketError } = await supabase.storage
          .from('license-upload')
          .upload(`public/${uuidv4()}.png`, file, {
            cacheControl: '3600',
            upsert: false,
          })
        console.log(data)
        console.log(bucketError)
        if (bucketError) {
          console.log(bucketError)
          throw bucketError
        } else {
          fileUrls.push(data.fullPath)
        }
      })
    }
    const { error: insertError } = await supabase.from('licenses').insert({
      license_no: formData.value.licenseNo,
      license_class: formData.value.licenseClass,
      expiry: formData.value.expiry,
      last_name: formData.value.lastName,
      first_name: formData.value.firstName,
      address: formData.value.address,
      city: formData.value.city,
      province: formData.value.province,
      postal_code: formData.value.postalCode,
      date_of_birth: formData.value.dateOfBirth,
      sex: formData.value.sex,
      height: formData.value.height,
      weight: formData.value.weight,
      issued: formData.value.issued,
      file_urls: fileUrls,
    })
    if (insertError) {
      console.log(insertError)
      throw insertError
    } else {
      return 'success'
    }
  }

  return { formData, uploadFormData }
})
