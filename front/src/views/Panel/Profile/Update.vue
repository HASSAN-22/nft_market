<template>
    <div>
        <div class="flex gap-5 justify-center fm:flex-col mx-8 mb-10">
            <div class="w-[60%] fm:w-full bg-d-color-blue-light-dark rounded p-4">
                <Error></Error>
                <div class="mb-10 pb-5 text-center border-b border-b-gray-800">
                    <span class="text-xl fm:text-sm text-crimson-200 !font-bold">مشخصات من</span>
                </div>
                <Input v-model="username" type="text" id="username" label="نام و نام خانوادگی" my_class="mb-6"></Input>
                <Input v-model="email" type="email" id="email" label="ایمیل" placeholder="ایمیل شما به کسی نمایش داده نمیشود" my_class="mb-6"></Input>
                <Input v-model="personal_id" type="text" id="personal_id" label="آیدی اختصاصی" v-debounce:300ms="checkPersonalId" :debounce-events="['keydown']" :my_class="message === '' ? 'mb-6' : ''"></Input>
                <div v-show="message" :class="['w-full mb-6']">
                    <span :class="checkUser ? 'text-green-600' : 'text-crimson-100', ['!font-bold']">{{ message }}</span>
                </div>
                <Textarea v-model="bio" id="bio" label="درباره من" :maxlength="1000" :required="false" :alert="bio.length+'/1000'"></Textarea>
                <InputFile title="تصویر زمینه" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event, 'cover_image')" :key="logoKey"></InputFile>
                <div>
                    <img :src="prevBg ? prevBg : $store.state.storage+cover_image" class="w-20 h-20"/>
                </div>
                <InputFile title="آواتار" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event)" :key="bgImageKey"></InputFile>
                <div>
                    <img :src="prevAvatar ? prevAvatar : $store.state.storage+avatar" class="w-20 h-20"/>
                </div>
                <div class="mb-10 mt-20 pb-5 text-center border-b border-b-gray-800">
                    <span class="text-xl fm:text-sm text-crimson-200 !font-bold">شبکه های اجتماعی</span>
                </div>
                <Input v-model="telegram" type="text" id="telegram" :required="false" label="تلگرام" my_class="mb-6"></Input>
                <Input v-model="instagram" type="text" id="instagram" :required="false" label="اینستاگرام" my_class="mb-6"></Input>
                <Input v-model="facebook" type="text" id="facebook" :required="false" label="فیسبوک" my_class="mb-6"></Input>
                <Input v-model="twitter" type="text" id="twitter" :required="false" label="توییتر" my_class="mb-6"></Input>
                <Input v-model="tiktok" type="text" id="tiktok" :required="false" label="تیک تاک" my_class="mb-6"></Input>
                <Input v-model="snapchat" type="text" id="snapchat" :required="false" label="اسنبپ چت" my_class="mb-6"></Input>
                <Input v-model="youtube" type="text" id="youtube" :required="false" label="یوتیوب" my_class="mb-6"></Input>
                <Input v-model="site" type="text" id="site" :required="false" label="وب سایت" my_class="mb-6"></Input>

                <Button text="ذخیره" my_class="!mt-5 !w-[95%] !p-4" class="text-center" :btnLoading="btnLoading" @callback="btnLoading === false ? insert() : ''"></Button>
            </div>
        </div>
        <Loading :loading='loading'></Loading>
    </div>
</template>

<script>
import Loading from "@/components/Loading"
import Error from "@/components/Error"
import Input from "@/components/Input"
import Textarea from "@/components/Textarea"
import InputFile from "@/components/InputFile"
import Button from "@/components/Button"
import axios from '@/plugins/axios';
import Toast from '@/plugins/toast'
export default {
    name:'ProfileUpdate',
    components:{Input,Textarea,InputFile,Button, Error, Loading},
    data(){
        return{
            username:'',
            email:'',
            personal_id:'',
            bio:'',
            avatar:'',
            cover_image:'',
            telegram:'',
            instagram:'',
            facebook:'',
            twitter:'',
            tiktok:'',
            snapchat:'',
            youtube:'',
            site:'',
            btnLoading:false,
            prevAvatar:null,
            prevBg:null,
            checkUser:false,
            message:'',
            loading:false,
            user_id:null,
        }
    },
    mounted(){
        this.user_id = localStorage.getItem('id');
        this.getProfile();
    },
    methods:{
        async getProfile(){
            this.loading = true;
            await axios.get(this.$store.state.api+'profile/'+this.user_id).then(resp=>{
                let data = resp.data.data;
                let profile = data.profile;
                let social = data.social_media;

                if(profile !== null){
                    this.username=profile.username  == null ? '' : profile.username;
                    this.email=profile.email == null ? '' : profile.email;
                    this.personal_id=profile.personal_id  == null ? '' : profile.personal_id;
                    this.bio=profile.bio == null ? '' : profile.bio;
                    this.avatar=profile.avatar == null ? '' : profile.avatar;
                    this.cover_image=profile.cover_image == null ? '' : profile.cover_image;
                }

                if(social !== null){
                    this.telegram=social.telegram == null ? '' : social.telegram;
                    this.instagram=social.instagram == null ? '' : social.instagram;
                    this.facebook=social.facebook == null ? '' : social.facebook;
                    this.twitter=social.twitter == null ? '' : social.twitter;
                    this.tiktok=social.tiktok == null ? '' : social.tiktok;
                    this.snapchat=social.snapchat == null ? '' : social.snapchat;
                    this.youtube=social.youtube == null ? '' : social.youtube;
                    this.site=social.site == null ? '' : social.site;
                }
            })
            this.loading = false;
        },
        async insert(){
            this.loading = this.btnLoading = true;
            let frmData = new FormData();
            frmData.append('username',this.username);
            frmData.append('email',this.email);
            frmData.append('personal_id',this.personal_id);
            frmData.append('bio',this.bio);
            frmData.append('avatar',this.avatar);
            frmData.append('cover_image',this.cover_image);
            frmData.append('telegram',this.telegram);
            frmData.append('instagram',this.instagram);
            frmData.append('facebook',this.facebook);
            frmData.append('twitter',this.twitter);
            frmData.append('tiktok',this.tiktok);
            frmData.append('snapchat',this.snapchat);
            frmData.append('youtube',this.youtube);
            frmData.append('site',this.site);
            frmData.append('_method','patch');
            await axios.post(this.$store.state.api+'profile/'+this.user_id, frmData).then(resp=>{
                Toast.success("با موفقیت ثبت شد")
            }).catch(err=>{
                this.$store.commit('handleError', err)
            })

            this.loading = this.btnLoading = false;

        },
        getFile(event, type="avatar"){
            let file = event.target.files[0];
            let preview = URL.createObjectURL(file);
            if(type == 'avatar'){
                this.avatar = file;
                this.prevAvatar =preview;
            }else{
                this.cover_image = file;
                this.prevBg =preview;
            }
        },
        async checkPersonalId(text){
            this.loading = true;
            this.personal_id = text;
            await axios.post(this.$store.state.api+'check-personal-id',{personal_id:text}).then(res=>{
                this.checkUser = true
                this.message = 'آیدی اختصاصی مورد تایید میباشد'
            }).catch(err=>{
                if(err.response.status === 422){
                    this.checkUser = false
                    this.message = 'آیدی اختصاصی وارد شده خالی یا تکراری است'
                }
            })
            this.loading = false;
        },
    }
}
</script>