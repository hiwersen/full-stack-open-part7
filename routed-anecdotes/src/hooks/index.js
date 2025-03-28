import { useState } from "react"

export const useField = (type = 'text') => {
    const [value, setValue] = useState('')

    class Field {
        constructor() {
            this.type = type
            this.value = value
            this.onChange = event => setValue(event.target.value)
        }

        reset() {
            setValue('')
        }
    }

    return new Field()
}

export const useReset = (...functions) => {
    return () => {
        functions.forEach(reset => reset())
    }
}