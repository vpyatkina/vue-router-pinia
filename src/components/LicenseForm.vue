<script setup>
import { ref } from 'vue'

import FloatLabel from 'primevue/floatlabel'
//import InputMask from 'primevue/inputmask'
import {
  InputNumber,
  InputText,
  InputMask,
  Select,
  DatePicker,
  InputGroup,
  InputGroupAddon,
  FileUpload,
} from 'primevue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndSmaller = ref(breakpoints.smallerOrEqual('md'))

const formData = ref({
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
})

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
</script>

<template>
  <div class="flex align-middle justify-center">
    <form action="" class="bg-white p-10 rounded-4xl mt-5 md:mt-20 w-11/12 md:w-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-15">
        <FloatLabel variant="in">
          <InputMask
            id="license-no"
            v-model="formData.licenseNo"
            mask="999999-999"
            fluid
          ></InputMask>
          <label for="license-no">License Number</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputNumber
            id="license-class"
            v-model="formData.licenseClass"
            fluid
            :useGrouping="false"
          ></InputNumber>
          <label for="license-class">License Class</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputMask id="expiry" v-model="formData.expiry" mask="99 aaa 9999" fluid></InputMask>
          <label for="expiry">Expiry</label>
        </FloatLabel>
        <div v-if="mdAndSmaller === false"></div>

        <FloatLabel variant="in">
          <InputText id="last" v-model="formData.lastName" fluid></InputText>
          <label for="last">Last Name</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="first" v-model="formData.firstName" fluid></InputText>
          <label for="first">First Name</label>
        </FloatLabel>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-15">
        <FloatLabel variant="in" class="md:col-span-3">
          <InputText id="address" v-model="formData.address" fluid></InputText>
          <label for="address">Street Address</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputText id="city" v-model="formData.city" fluid></InputText>
          <label for="city">City</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <Select
            id="province"
            v-model="formData.province"
            :options="provinces"
            optionLabel="name"
            fluid
          ></Select>
          <label for="province">Province</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputMask
            id="postal-code"
            v-model="formData.postalCode"
            mask="*** ***"
            fluid
          ></InputMask>
          <label for="postal-code">Postal Code</label>
        </FloatLabel>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <FloatLabel variant="in">
          <DatePicker id="date-of-birth" v-model="formData.dateOfBirth" fluid />
          <label for="date-of-birth">Date of Birth</label>
        </FloatLabel>
        <div v-if="mdAndSmaller === false" class="col-span-2"></div>

        <FloatLabel variant="in">
          <Select id="sex" v-model="formData.sex" :options="sexs" fluid></Select>
          <label for="sex">Sex</label>
        </FloatLabel>

        <InputGroup>
          <FloatLabel variant="in">
            <InputNumber id="height" v-model="formData.height" :use-grouping="false" fluid />
            <label for="height">Height</label>
          </FloatLabel>
          <InputGroupAddon>
            <span>cm</span>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <FloatLabel variant="in">
            <InputNumber id="weight" v-model="formData.weight" :use-grouping="false" fluid />
            <label for="weight">Weight</label>
          </FloatLabel>
          <InputGroupAddon>
            <span>cm</span>
          </InputGroupAddon>
        </InputGroup>

        <FloatLabel variant="in">
          <InputMask id="issued" v-model="formData.issued" mask="99 aaa 9999" fluid></InputMask>
          <label for="issued">Issued</label>
        </FloatLabel>
      </div>

      <FileUpload
        name="license-file"
        url="/api/upload"
        @upload="onAdvancedUpload($event)"
        :multiple="true"
        :maxFileSize="1000000"
      >
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
      </FileUpload>
    </form>
  </div>
</template>
