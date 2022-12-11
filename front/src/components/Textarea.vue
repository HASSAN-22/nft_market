<template>
    <div class="flex flex-col gap-2 w-full relative">
        <div>
            <label class="text-md fm:text-sm">{{ label }} 
                <b v-show="required" class="text-crimson-100 fm:text-sm !font-bold">*</b>
            </label>
        </div>
        <textarea 
            :class="['border border-blue-700 focus:outline-none p-2 fm:p-1 bg-gray-900 w-full rounded-lg mb-1 fm:text-sm', my_class]" 
            :v-model="modelValue" 
            :value="modelValue" 
            :maxlength="maxlength" 
            :placeholder="placeholder" 
            @input="$emit('update:modelValue', $event.target.value)" 
            :id="id"
            :rows="rows" 
            :cols="cols">
        </textarea>
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
        rows:{
            type:Number,
            default:7
        },
        cols:{
            type:Number,
            default:7
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
        maxlength:{
            type:Number,
            default:20000
        },
        label:String,
        id:String,
    },
}
</script>
