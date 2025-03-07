<script setup>
import { ref } from 'vue'
import {
  InputNumber,
  InputText,
  InputMask,
  Select,
  DatePicker,
  InputGroup,
  InputGroupAddon,
  FileUpload,
  Button,
  FloatLabel,
  useToast,
  Message,
} from 'primevue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useFormDataStore } from '@/stores/formDataStore'

// Tailwind reactive breakpoints that can be used by Vue
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndSmaller = ref(breakpoints.smallerOrEqual('md'))

const formDataStore = useFormDataStore()
const toast = useToast()

//template for form data
const emptyFormData = {
  licenseNo: null,
  licenseClass: null,
  expiry: null,
  lastName: null,
  firstName: null,
  address: null,
  city: null,
  province: null,
  postalCode: null,
  dateOfBirth: null,
  sex: null,
  height: null,
  weight: null,
  issued: null,
  files: [],
}

//Object to hold data from form
const formData = ref({ ...emptyFormData })

//Arrays holding lists for select fields
const sexs = ref(['M', 'F', 'X'])
const provinces = ref([
  { name: 'Alberta', code: 'AB' },
  { name: 'British Columbia', code: 'BC' },
  { name: 'Manitoba', code: 'MB' },
  { name: 'New Brunswick', code: 'NB' },
  { name: 'Newfoundland and Labrador', code: 'NL' },
  { name: 'Northwest Territories', code: 'NT' },
  { name: 'Nova Scotia', code: 'NS' },
  { name: 'Nunavut', code: 'NU' },
  { name: 'Ontario', code: 'ON' },
  { name: 'Prince Edward Island', code: 'PE' },
  { name: 'Quebec', code: 'QC' },
  { name: 'Saskatchewan', code: 'SK' },
  { name: 'Yukon', code: 'YT' },
])

//show success message
const visible = ref(false)
function showMessage() {
  visible.value = true

  setTimeout(() => {
    visible.value = false
  }, 3500)
}

//Function to save uploaded files to formData
function onAdvancedUpload(event) {
  const files = event.files
  Array.prototype.push.apply(formData.value.files, files)
}

// Make some changes to form data then use store function to transfer data to db
async function formSubmission(event) {
  event.preventDefault()
  const sanitizedData = {
    licenseNo: formData.value.licenseNo.replace(/\D/g, ''),
    licenseClass: formData.value.licenseClass,
    expiry: formData.value.expiry.toDateString(),
    lastName: formData.value.lastName,
    firstName: formData.value.firstName,
    address: formData.value.address,
    city: formData.value.city,
    province: formData.value.province.code,
    postalCode: formData.value.postalCode.replace(/\s/g, ''),
    dateOfBirth: formData.value.dateOfBirth.toDateString(),
    sex: formData.value.sex,
    height: formData.value.height,
    weight: formData.value.weight,
    issued: formData.value.issued.toDateString(),
    files: formData.value.files,
  }
  formDataStore.formData = sanitizedData
  try {
    await formDataStore.uploadFormData()
    showMessage()
    formData.value = { ...emptyFormData, files: [] }
    formDataStore.formData = formData.value
    formDataStore.fileUrls = []
  } catch (error) {
    console.log('an error has occured')
    const message = JSON.stringify(error) !== '{}' ? error.message : 'Undefined Error'
    toast.add({
      severity: 'error',
      summary: 'Error Submitting Form',
      detail: 'Error Details: ' + message,
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="flex align-middle justify-center">
    <!-- Big ol' form to collect license data -->
    <form
      action=""
      class="bg-white dark:bg-neutral-800 p-10 rounded-4xl mt-5 md:mt-20 w-11/12 md:w-auto"
      id="license-form"
      v-on:submit="formSubmission($event)"
    >
      <Message v-if="visible" severity="success" :life="3000" fluid class="mb-5"
        >Success: License Information Submitted</Message
      >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-15">
        <FloatLabel variant="in">
          <InputMask
            id="license-no"
            v-model="formData.licenseNo"
            mask="999999-999"
            fluid
            required
          ></InputMask>
          <label for="license-no">License Number</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputNumber
            id="license-class"
            v-model="formData.licenseClass"
            fluid
            :useGrouping="false"
            required
          ></InputNumber>
          <label for="license-class">License Class</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <DatePicker id="expiry" v-model="formData.expiry" fluid required />
          <label for="expiry">Expiry</label>
        </FloatLabel>
        <!-- Div to take up a grid space, does not render when grid is collapsed to 1 collum -->
        <div v-if="mdAndSmaller === false"></div>

        <FloatLabel variant="in">
          <InputText id="last" v-model="formData.lastName" fluid required></InputText>
          <label for="last">Last Name</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="first" v-model="formData.firstName" fluid required></InputText>
          <label for="first">First Name</label>
        </FloatLabel>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-15">
        <FloatLabel variant="in" class="md:col-span-3">
          <InputText id="address" v-model="formData.address" fluid required></InputText>
          <label for="address">Street Address</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputText id="city" v-model="formData.city" fluid required></InputText>
          <label for="city">City</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <Select
            id="province"
            v-model="formData.province"
            :options="provinces"
            optionLabel="name"
            fluid
            required
          ></Select>
          <label for="province">Province</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputMask
            id="postal-code"
            v-model="formData.postalCode"
            mask="*** ***"
            fluid
            required
          ></InputMask>
          <label for="postal-code">Postal Code</label>
        </FloatLabel>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <FloatLabel variant="in">
          <DatePicker id="date-of-birth" v-model="formData.dateOfBirth" fluid required />
          <label for="date-of-birth">Date of Birth</label>
        </FloatLabel>
        <!-- Div to take up a grid space, does not render when grid is collapsed to 1 collum -->
        <div v-if="mdAndSmaller === false" class="col-span-2"></div>

        <FloatLabel variant="in">
          <Select id="sex" v-model="formData.sex" :options="sexs" fluid required></Select>
          <label for="sex">Sex</label>
        </FloatLabel>

        <InputGroup>
          <FloatLabel variant="in">
            <InputNumber
              id="height"
              v-model="formData.height"
              :use-grouping="false"
              fluid
              required
            />
            <label for="height">Height</label>
          </FloatLabel>
          <InputGroupAddon>
            <span>cm</span>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <FloatLabel variant="in">
            <InputNumber
              id="weight"
              v-model="formData.weight"
              :use-grouping="false"
              fluid
              required
            />
            <label for="weight">Weight</label>
          </FloatLabel>
          <InputGroupAddon>
            <span>kg</span>
          </InputGroupAddon>
        </InputGroup>

        <FloatLabel variant="in">
          <DatePicker id="issued" v-model="formData.issued" fluid required />
          <label for="issued">Issued</label>
        </FloatLabel>
      </div>

      <FileUpload
        name="license-file"
        @uploader="onAdvancedUpload($event)"
        :custom-upload="true"
        :multiple="true"
        :maxFileSize="1000000"
      >
        <template #empty>
          <!-- Shows dialog with number of files uploaded -->
          <span v-if="formData.files.length === 0">Drag and drop files to here to upload.</span>
          <span v-else
            >{{ formData.files.length }} file{{
              formData.files.length >= 2 ? 's have' : ' has'
            }}
            been uploaded.</span
          >
        </template>
      </FileUpload>
      <Button type="submit" class="mt-5">Submit</Button>
    </form>
  </div>
</template>
