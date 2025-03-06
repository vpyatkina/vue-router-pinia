<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTableDataStore } from '@/stores/tableDataStore'
import { Card, Column, DataTable, InputText } from 'primevue'

const tableDataStore = useTableDataStore()
const tableData = ref([])

const globalSearch = ref('')

const filteredData = computed(() => {
  if (!globalSearch.value) return tableData.value

  const searchTerm = globalSearch.value.toLowerCase()
  return tableData.value.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm)),
  )
})

onMounted(async () => {
  await tableDataStore.getTableData()
  tableData.value = tableDataStore.tableData
  console.log(tableData.value)
})
</script>

<template>
  <Card class="overflow-auto">
    <template #title
      >Licences Table
      <div class="p-input-icon-left float-right" style="display: inline-block; margin-left: 20px">
        <InputText v-model="globalSearch" placeholder="Global Search" />
      </div>
    </template>
    <template #content>
      <DataTable
        :value="filteredData"
        tableStyle="min-width: 50rem"
        :show-gridlines="true"
        :striped-rows="true"
      >
        <!-- prettier-ignore-start -->
        <Column field="created_at" header="Created" class="whitespace-nowrap" sortable></Column>
        <Column
          field="license_no"
          header="License Number"
          class="whitespace-nowrap"
          sortable
        ></Column>
        <Column
          field="license_class"
          header="License Class"
          class="whitespace-nowrap"
          sortable
        ></Column>
        <Column field="expiry" header="Expiry Date" class="whitespace-nowrap" sortable></Column>
        <Column field="last_name" header="Last Name" class="whitespace-nowrap" sortable></Column>
        <Column field="first_name" header="First Name" class="whitespace-nowrap" sortable></Column>
        <Column field="address" header="Address" class="whitespace-nowrap" sortable></Column>
        <Column field="city" header="City" class="whitespace-nowrap" sortable></Column>
        <Column field="province" header="Province" class="whitespace-nowrap" sortable></Column>
        <Column
          field="postal_code"
          header="Postal Code"
          class="whitespace-nowrap"
          sortable
        ></Column>
        <Column
          field="date_of_birth"
          header="Date of Birth"
          class="whitespace-nowrap"
          sortable
        ></Column>
        <Column field="sex" header="Sex" class="whitespace-nowrap" sortable></Column>
        <Column field="height" header="Height" class="whitespace-nowrap" sortable></Column>
        <Column field="weight" header="Weight" class="whitespace-nowrap" sortable></Column>
        <Column field="issued" header="Date Issued" class="whitespace-nowrap" sortable></Column>
        <!-- prettier-ignore-end -->
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
