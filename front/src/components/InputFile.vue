<template>
    <div class="flex flex-col gap-2 w-full mb-2">
        <div>
            <label class="text-md rem--8">{{ title }} 
                <b v-show="required" class="text-crimson-100 rem--7 !font-bold">*</b>
            </label>
        </div>
        <input v-if="multiple" @change="$emit('callback', $event)" type="file" multiple class="mb-1 border border-blue-700 focus:outline-none p-2 bg-gray-900 w-full rounded-lg"/>
        <input v-else @change="$emit('callback', $event)" type="file"  class="mb-1 border border-blue-700 focus:outline-none p-2 bg-gray-900 w-full rounded-lg"/>
        <span v-show="alert" class="text-crimson-200 !font-bold rem--8 text-md">{{alert}}</span>

    </div>
    
</template>
<script>
export default {
    name:'InputFile',
    props:{
        width:{
            type:String,
            default:'w-full'
        },
        alert:{
            type:String,
            default:''
        },
        multiple:{
            type:Boolean,
            default:false
        },
        title:String,
        id:String,
        required:{
            type:Boolean,
            default:true
        }
    },
}
</script>
