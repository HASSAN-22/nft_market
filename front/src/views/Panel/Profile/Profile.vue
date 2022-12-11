<template>
    <div>
        <div v-if="profile !== null">
            <div class="mx-8 p-4 mb-10 bg-d-color-blue-light-dark rounded flex justify-center ">
                <div class="flex justify-center shadow w-full">
                    <img :src="$store.state.storage+profile.cover_image" class="w-full rounded fm:h-[18rem]"/>
                </div>
            </div>
            <div class="flex fm:flex-col gap-2 mx-8">
                <div class="relative p-4 w-[30%] fm:w-full h-full bg-d-color-blue-light-dark">
                    <div class="flex flex-col fm:items-center gap-3">
                        <div class="flex fm:flex-col gap-2 items-center">
                            <div class="w-32 h-32 fm:w-28 fm:h-28 rounded-full">
                                <img :src="$store.state.storage+profile.avatar" class="rounded-full h-full w-full"/>
                            </div>
                            <div class="flex flex-col fm:items-center">
                                <span class="text-crimson-200 !font-bold text-2xl fm:text-xl">{{profile.username}}</span>
                                <span><span class="text-d-color-font-middle text-lg fm:text-sm ltr">{{profile.personal_id}}@</span></span>
                                <span class="text-md">{{profile.created_at.split('T')[0]}}</span>
                            </div>
                        </div>
                        <div>
                            <div class="flex items-end fm:flex-col fm:items-center fm:gap-2 justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="text-lg fm:text-md ltr">{{$store.state.shortAddress}}</span>
                                    <span v-if="$store.state.isCopy == false" class="cursor-pointer" @click="$store.commit('copy','wwdfsdfsd')">
                                        <i class="fas fa-copy text-crimson-200 !font-bold text-2xl fm:text-lg"></i>
                                    </span>
                                    <span v-else class="cursor-pointer" @click="copyAddress()">
                                        <i class="fas fa-check text-green-500 !font-bold text-2xl fm:text-lg"></i>
                                    </span>
                                </div>
                                <div>
                                    <Link :urlPath="{name:'ProfileUpdate'}" text="ویرایش پروفایل"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 w-full my-5"></div>
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-center">
                            <div class="flex flex-col gap-1">
                                <span class="text-xl fm:text-lg text-crimson-200 !font-bold">دنبال کننده گان</span>
                                <span class="text-lg fm:text-md">55,000</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-xl fm:text-lg text-crimson-200 !font-bold">دنبال شوندگان</span>
                                <span class="text-lg fm:text-md">55,000</span>
                            </div>
                        </div>
                        <div>
                            <Button text="دنبال کردن" my_class="!w-full !rounded-none !p-3 !rounded-tr-full !rounded-bl-full"></Button>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 w-full my-5"></div>
                    <div>
                        <ul class="flex flex-wrap items-center justify-evenly">
                            <li>
                                <a :href="$store.getters.isNull(social, 'twitter')"><i class="fab fa-twitter text-4xl fm:text-2xl text-crimson-200 !font-bold"></i></a>
                            </li>
                            <li>
                                <a :href="$store.getters.isNull(social, 'facebook')"><i class="fab fa-facebook text-4xl fm:text-2xl text-teal-500 !font-bold"></i></a>
                            </li>
                            <li>
                                <a :href="$store.getters.isNull(social, 'telegram')"><i class="fab fa-telegram text-4xl fm:text-2xl text-blue-500 !font-bold"></i></a>
                            </li>
                            <li>
                                <a :href="$store.getters.isNull(social, 'instagram')"><i class="fab fa-instagram text-4xl fm:text-2xl text-[#7342b7] !font-bold"></i></a>
                            </li>
                            <li>
                                <a :href="$store.getters.isNull(social, 'snapchat')"><i class="fab fa-snapchat-ghost text-4xl fm:text-2xl text-yellow-400 !font-bold"></i></a>
                            </li>
                            <li>
                                <a :href="$store.getters.isNull(social, 'tiktok')"><i class="fab fa-tiktok text-4xl fm:text-2xl text-pink-500 !font-bold"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="border-t border-gray-700 w-full my-5"></div>
                    <div>
                        <span>درباره من:</span>
                        <div class="mt-2">
                            <p class="break-all">
                                {{ $store.getters.isNull(profile, 'bio') }}
                            </p>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 w-full my-5"></div>
                    <div class="flex flex-col gap-2 mb-5">
                        <div class="flex items-center gap-2 cursor-pointer">
                            <span><i class="fab fa-youtube text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                            <span><a :href="$store.getters.isNull(social, 'youtube')">{{$store.getters.isNull(social, 'youtube')}}</a></span>
                        </div>
                        <routerLink to="">
                            <div class="flex items-center gap-2">
                                <span><i class="fas fa-globe text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                                <span><a :href="$store.getters.isNull(social, 'site')">{{$store.getters.isNull(social, 'site')}}</a></span>
                            </div>
                        </routerLink>
                    </div>
                    <div class="border-t border-gray-700 w-full my-5"></div>
                    <div class="flex items-center gap-2 cursor-pointer">
                        <span><i class="fas fa-flag text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                        <span>گزارش</span>
                    </div>
                </div>
                <div class="p-4 w-[70%] fm:w-full bg-d-color-blue-light-dark">
                    <div class="text-sm font-medium text-center border-b border-gray-700">
                        <ul class="flex flex-wrap -mb-px">
                            <li class="mr-2" @click="chooseTabe = 1">
                                <span :class="[chooseTabe == 1 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                                    NFT ها
                                </span>
                            </li>
                            <li class="mr-2" @click="getCollections()">
                                <span :class="[chooseTabe == 2 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                                    کالکشن ها
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-5">
                        <div v-show="chooseTabe == 1">
                            <div>
                                <div class="flex fm:flex-col flex-row flex-wrap justify-evenly">
                                    <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative" v-for="i in 10" :key="i">
                                        <div class="group relative">
                                            <img src="@/assets/img/cover.jpg" class="h-[21rem] fm:h-[14rem] w-full rounded-t-lg" />
                                            <div class="group-hover:h-full h-0 top-0 w-full bg-black opacity-60 cursor-pointer absolute ease-in duration-300 rounded-t-lg"></div>
                                        </div>
                                        <div class="mt-4 mx-2">
                                            <div class="flex justify-between">
                                                <span class="text-2xl fm:text-xl !font-bold">Nft title</span>
                                                <div class="flex flex-col items-end">
                                                    <span class="text-2xl fm:text-xl !font-bold ltr">2.0025 ETH</span>
                                                    <span class="text-sm ltr">222 USD</span>
                                                </div>
                                            </div>

                                            <div class="flex items-center fm:flex-col justify-between mt-8 gap-2 relative">
                                                <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                                    <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                                    <div class="">
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                            <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                                        </div>
                                                    </div>
                                                    <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] right-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
                                                        <div class="flex justify-between mt-3 mx-4">
                                                            <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                            <div class="flex items-center gap-2">
                                                                <div class="flex items-center flex-col">
                                                                    <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                                    <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                                </div>
                                                                <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                            </div>
                                                        </div>
                                                        <div class="mt-5 mx-4">
                                                            <p class="fm:text-sm text-md">
                                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis....
                                                            </p>
                                                        </div>
                                                        <div class="flex justify-between mt-8 mx-4">
                                                            <div class="flex flex-col gap-1 rounded-lg ">
                                                                <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                                <span class="fm:text-sm text-md">150,000</span>
                                                            </div>
                                                            <div class="flex flex-col gap-1 rounded-lg ">
                                                                <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                                <span class="fm:text-sm text-md">150,000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                                    <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                                    <div class="">
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                            <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                                        </div>
                                                    </div>
                                                    <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] left-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
                                                        <div class="flex justify-between mt-3 mx-4">
                                                            <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                            <div class="flex items-center gap-2">
                                                                <div class="flex items-center flex-col">
                                                                    <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                                    <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                                </div>
                                                                <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                            </div>
                                                        </div>
                                                        <div class="mt-5 mx-4">
                                                            <p class="fm:text-sm text-md">
                                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis....
                                                            </p>
                                                        </div>
                                                        <div class="flex justify-between mt-8 mx-4">
                                                            <div class="flex flex-col gap-1 rounded-lg ">
                                                                <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                                <span class="fm:text-sm text-md">150,000</span>
                                                            </div>
                                                            <div class="flex flex-col gap-1 rounded-lg ">
                                                                <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                                <span class="fm:text-sm text-md">150,000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-8 text-center">
                                                <vue-countdown :time="convertTime" v-slot="{hours, minutes, seconds }">
                                                    <span class="text-2xl fm:text-xl text-green-500">{{ hours }}h {{ minutes }}m {{ seconds }}s</span>
                                                </vue-countdown>
                                            </div>
                                            <div class="mt-8 text-center">
                                                <Link text="مشاهده" :urlPath="{name:'Category'}" my_class="!rounded-none !rounded-tr-full !rounded-bl-full fm:!py-2 !w-full"></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="chooseTabe == 2">
                            <div>
                                <div class="flex flex-wrap items-center justify-evenly fm:flex-col">
                                    <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative" v-for="collection in collections" :key="collection.id">
                                        <div class="group relative">
                                            <div class="opacity-0 group-hover:opacity-100 absolute top-0 left-[-2rem] rounded-lg ease-in duration-300">
                                                <div class="flex flex-col items-center gap-2">
                                                    <div class="cursor-pointer" @click="collectionEdit(collection.id)"><span><i class="fas fa-edit text-yellow-400 text-xl fm:text-md"></i></span></div>
                                                    <div class="cursor-pointer" @click="colectionDelete(collection.id)"><span><i class="fas fa-trash text-crimson-200 !fond-bold text-xl fm:text-md"></i></span></div>
                                                </div>
                                            </div>
                                            <routerLink to="">
                                                <img :src="$store.state.storage+collection.bg_image" class="h-[28rem] fm:h-[18rem] w-full rounded-lg"/>
                                                <div class="opacity-0 group-hover:opacity-50  h-full w-full absolute bg-black top-0 rounded-lg ease-in duration-300"></div>
                                                <div class="opacity-0 group-hover:opacity-100 flex flex-col justify-between h-full w-full absolute top-0 rounded-lg ease-in duration-300">
                                                    <div class="flex justify-between mt-5 mx-5">
                                                        <div class="mt-2">
                                                            <span class="bg-gray-800 bg-opacity-70 px-4 fm:px-2 py-2 fm:py-1 rounded-lg text-crimson-200 !font-bold text-sm">{{collection.symbol}}</span>
                                                        </div>
                                                        <div class="w-32 h-32 fm:w-20 fm:h-20 p-1 bg-blue-700 bg-opacity-50 rounded-lg">
                                                            <img :src="$store.state.storage+collection.logo" class="w-full h-full rounded-lg"/>
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-end flex-col mb-5 mx-5">
                                                        <div class="mb-2">
                                                            <span class="bg-gray-800 bg-opacity-70 px-4 fm:px-2 py-2 fm:py-1 rounded-lg text-md fm:text-sm">{{collection.title}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </routerLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal title="ویرایش کالکشن" save="ذخیره" :btnLoading="collectionBtnLoadin" @callback="collectionBtnLoadin ? '' : updateCollection()" ref="collectionEditModal">
            <div>
                <Error></Error>
                <Input v-model="title" type="text" id="title" label="عنوان" my_class="mb-6"></Input>
                <Input v-model="symbol" type="text" id="symbol" label="نماد" my_class="mb-6"></Input>
                <Textarea v-model="description" id="description" label="توضیحات" :maxlength="1000" :required="false" :alert="description.length+'/1000'"></Textarea>
                <InputFile title="تصویر زمینه" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event, 'background')" :required="false" :key="logoKey"></InputFile>
                <InputFile title="لوگو" id="" alert="فرمت های مجاز: jpg, jpeg, png, gif" class="mt-5" @callback="getFile($event)" :required="false" :key="bgImageKey"></InputFile>
            </div>
        </Modal>
        <Loading :loading="loading"></Loading>
    </div>
</template>

<script>
let signer, market, nft;

import Error from "@/components/Error"
import Input from "@/components/Input"
import Textarea from "@/components/Textarea"
import InputFile from "@/components/InputFile"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import Loading from "@/components/Loading"
import Link from "@/components/Link"
import axios from '@/plugins/axios';
import Toast from '@/plugins/toast'
export default {
    name:'Profile',
    components:{Button, Link, Loading,Modal, Error, Input,Textarea,InputFile},
    data(){
        return{
            user_id:null,
            chooseTabe:1,
            loading:false,
            profile:null,
            social:null,
            collections:[],
            collectionId:null,
            collectionBtnLoadin:false,

            title:'',
            symbol:'',
            description:'',
            bg_image:'',
            logo:'',
            logoKey:0,
            bgImageKey:0,
        }
    },
    async mounted() {
        this.user_id = localStorage.getItem('id');
        this.getData();
        [signer, market, nft] = await this.$store.getters.getContractData;
        console.log(await nft.getAllNfts())
    },
    computed:{
        convertTime(){
            let now = new Date();
            return  now.getTime();
        }
    },
    methods:{
        async getData(){
            this.loading = true;
            await axios.get(this.$store.state.api+'profile/'+this.user_id).then(resp=>{
                this.profile = resp.data.data.profile;
                this.social = resp.data.data.social_media;
            }).catch(err=>{
                Toast.error("دریافت اطلاعات با خطا مواجه شد")
            })
            this.loading = false;
        },

        async getCollections(loading=true){
            this.chooseTabe = 2;
            this.loading = loading;
            await axios.get(this.$store.state.api+'get-collections').then(resp=>{
                this.collections = resp.data.data;
            }).catch(err=>{
                Toast.error("دریافت اطلاعات با خطا مواجه شد")
            })
            this.loading = false;
        },

        async collectionEdit(collectionId){
            this.loading = true;
            this.bgImageKey = this.logoKey += 1;
            this.collectionId = collectionId;
            await axios.get(this.$store.state.api+'collection/'+collectionId).then(resp=>{
                let data = resp.data.data;
                this.collectionId = data.id;
                this.title = data.title;
                this.symbol = data.symbol;
                this.description = data.description;
            }).catch(err=>{
                Toast.error("دریافت اطلاعات با خطا مواجه شد")
            })
            this.loading = false;
            this.$refs.collectionEditModal.toggleModal();
        },

        async updateCollection(){
            this.loading = true;
            let frm = new FormData();
            frm.append('title',this.title)
            frm.append('symbol',this.symbol)
            frm.append('description',this.description)
            frm.append('logo',this.logo)
            frm.append('bg_image',this.bg_image)
            frm.append('_method','patch')
            await axios.post(this.$store.state.api+'collection/'+this.collectionId,frm).then(resp=>{
                Toast.success("با موفقیت ویرایش شد");
                this.$refs.collectionEditModal.toggleModal();
                this.getCollections(false);
            }).catch(err=>{
                this.$store.commit('handleError', err)
            })
            this.loading = false;
        },

        async colectionDelete(collectionId){
            let conf = confirm("ایا از حذف این کالکشن مطمئن هستید؟")
            if(conf){
                await axios.delete(this.$store.state.api+'collection/'+collectionId).then(resp=>{
                    if(resp.data.data === "has_child"){
                        Toast.warning("لطفا اول nft های کالکشن را حذف نمایید")
                    }else{
                        Toast.success("حذف با موفقیت انجام شد")
                    }
                }).catch(err=>{
                    Toast.error("حذف با خطا مواجه شد")
                })
            }
        },

        getFile(event, type="logo"){
            let file = event.target.files[0];
            if(type == 'logo'){
                this.logo = file;
            }else{
                this.bg_image = file;
            }
        },
    }
}
</script>