<template>
    <div :class="['w-full mb-16 relative bg-red-500 rounded-lg p-5 fm:p-2', my_class]" v-show="$store.state.errors.length > 0">
        <ul>
            <li class="text-white text-center my-2 !font-bold fm:text-sm" v-for="(error,i) in $store.state.errors" :key="i">{{ error[0] }}</li>
        </ul>
        <div @click="closeError()" class="absolute w-12 h-12 fm:h-8 fm:w-8 rounded-full cursor-pointer hover:bg-red-400 hover:transition hover:delay-150 hover:duration-300 hover:ease-in-out right-0 top-0">
            <span class="absolute text-white text-2xl left-[1rem] top-[.7rem] fm:top-0 fm:left-[.8rem] fm:text-sm"><i class="fas fa-times"></i></span>
        </div>
    </div>
</template>
<script>
export default {
    name:'Error',
    props:{
        // errors:{
        //     type:Array,
        //     default:()=>[]
        // },
        my_class:{
            type:String,
            default:'',
        }
    },
    methods:{
        closeError(){
           this.$store.state.errors = [];
        }
    }
}
</script>