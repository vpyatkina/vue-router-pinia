import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useTableDataStore = defineStore('tableData', () => {
  const tableData = ref([])
  async function getTableData() {
    const { data, error } = await supabase.from('licenses').select()

    if (error) {
      console.log(error)
      throw error
    }
    console.log(data)
    tableData.value = data
  }

  return { tableData, getTableData }
})
