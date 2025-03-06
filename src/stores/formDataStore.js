import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export const useFormDataStore = defineStore('formData', () => {
  const formData = ref({})
  const fileUrls = ref([])

  async function uploadFormData() {
    const files = formData.value.files

    if (files.length > 0) {
      // Wait for all file uploads to complete
      await Promise.all(
        files.map(async (file) => {
          const { data, error: bucketError } = await supabase.storage
            .from('license-upload')
            .upload(`public/${uuidv4() + file.name}`, file, {
              cacheControl: '3600',
              upsert: false,
            })
          if (bucketError) {
            throw bucketError
          }
          fileUrls.value.push(data.fullPath)
        }),
      )
    }

    // Now all files are uploaded, proceed with database insert
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
      file_urls: fileUrls.value,
    })

    if (insertError) {
      throw insertError
    }
    return 'success'
  }

  return { formData, fileUrls, uploadFormData }
})
