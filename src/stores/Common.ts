import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () =>
{
    const appMode = ref('dark')
    function ChangeTheme()
    {
        if (appMode.value == 'dark')
            appMode.value = 'light'
        else
            appMode.value = 'dark'

    }
    return { appMode, ChangeTheme }
})
