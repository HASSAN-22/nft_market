<template>
    <div>
        <div class="flex gap-5 fm:flex-col mx-8 mb-10">
            <div class="w-[60%] fm:w-full bg-d-color-blue-light-dark rounded p-4">
                <Error></Error>
                <Input v-model="title" type="text" id="title" label="عنوان" my_class="mb-6"></Input>
                <Input v-model="symbol" type="text" id="symbol" label="نماد" my_class="mb-6"></Input>
                <Textarea v-model="description" id="description" label="توضیحات" :maxlength="1000" :required="false" :alert="description.length+'/1000'"></Textarea>
                <InputFile title="تصویر زمینه" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event, 'background')" :key="logoKey"></InputFile>
                <InputFile title="لوگو" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event)" :key="bgImageKey"></InputFile>
                <Button text="ذخیره" my_class="!mt-5 !w-[95%] !p-4" class="text-center" :btnLoading="btnLoading" @callback="btnLoading === false ? insert() : ''"></Button>
            </div>
            <div class="w-[40%] fm:w-full h-full bg-d-color-blue-light-dark rounded p-4">
                <div class="flex flex-wrap items-center justify-evenly fm:flex-col">
                    <div class="w-full fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative">
                        <div class="group relative">
                            <img :src="prevBg" @error="replaceImage($event)" class="h-[35rem] fm:h-[25rem] w-full rounded-lg"/>
                            <div class="opacity-50  h-full w-full absolute bg-black top-0 rounded-lg"></div>
                            <div class="opacity-100 flex flex-col justify-between h-full w-full absolute top-0 rounded-lg">
                                <div class="flex justify-between mt-5 mx-5">
                                    <div class="mt-2">
                                        <span class="bg-gray-800 bg-opacity-70 px-4 fm:px-2 py-2 fm:py-1 rounded-lg text-crimson-200 !font-bold text-sm" v-show="symbol.length > 0">{{symbol}}</span>
                                    </div>
                                    <div class="w-32 h-32 fm:w-20 fm:h-20 p-1 bg-blue-700 bg-opacity-50 rounded-lg">
                                        <img v-if="prevLogo !== null" :src="prevLogo" class="w-full h-full rounded-lg"/>
                                    </div>
                                </div>
                                <div class="flex justify-end flex-col mb-5 mx-5">
                                    <div class="mb-2">
                                        <span class="bg-gray-800 bg-opacity-70 px-4 fm:px-2 py-2 fm:py-1 rounded-lg text-md fm:text-sm" v-show="title.length > 0">{{title}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Error from "@/components/Error"
import Input from "@/components/Input"
import Textarea from "@/components/Textarea"
import InputFile from "@/components/InputFile"
import Button from "@/components/Button"
import defaultBackgroundImage from '@/assets/img/background.png'
import axios from '@/plugins/axios';
import Toast from '@/plugins/toast'
export default {
    name:"CollectionStore",
    components:{Input,Textarea,InputFile,Button, Error},
    data(){
        return{
            title:'',
            symbol:'',
            description:'',
            logo:'',
            prevLogo:null,
            bg_image:'',
            prevBg:null,
            btnLoading:false,
            logoKey:0,
            bgImageKey:0
        }
    },
    methods:{
        async insert(){
            this.btnLoading=true;
            let frm = new FormData();
            frm.append('title',this.title)
            frm.append('symbol',this.symbol)
            frm.append('description',this.description)
            frm.append('logo',this.logo)
            frm.append('bg_image',this.bg_image)

            await axios.post(this.$store.state.api+'collection',frm).then(resp=>{
                Toast.success('با موفقیت ثبت شد')
                this.emptyData()
            }).catch(err=>{
                this.$store.commit('handleError', err)
            })
            this.btnLoading =false;
        },
        getFile(event, type="logo"){
            let file = event.target.files[0];
            let preview = URL.createObjectURL(file);
            if(type == 'logo'){
                this.logo = file;
                this.prevLogo =preview;
            }else{
                this.bg_image = file;
                this.prevBg =preview;
            }
        },
        replaceImage(event){
            event.target.src = defaultBackgroundImage
        },
        emptyData(){
            this.title = '';
            this.symbol = '';
            this.description = '';
            this.logo = '';
            this.bg_image = '';
            this.prevLogo = null;
            this.prevBg = null;
            this.bgImageKey++;
            this.logoKey++;
        },
    }
}
</script>