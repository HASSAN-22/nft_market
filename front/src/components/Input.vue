<template>
    <div class="flex flex-col gap-2 w-full relative">
        <div>
            <label class="text-md fm:text-sm">{{ label }} 
                <b v-show="required" class="text-crimson-100 fm:text-sm !font-bold">*</b>
            </label>
        </div>
        <input 
        :class="['border border-blue-700 focus:outline-none p-2 fm:p-1 bg-gray-900 w-full rounded-lg mb-1 fm:text-sm', my_class]" 
        :type="type" 
        :v-model="modelValue" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        :placeholder="placeholder"  
        :id="id" />
        <span v-show="alert" class="text-crimson-200 !font-bold fm:text-sm text-md">{{alert}}</span>

    </div>
</template>
<script>
export default {
    name:'Input',
    props:{
        modelValue:String|Number,
        my_class:{
            type:String,
            default:''
        },
        alert:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        },
        placeholder:{
            type:String,
            default:' '
        },
        required:{
            type:Boolean,
            default:true
        },
        label:String,
        id:String,
    },
}
</script>
