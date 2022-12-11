<template>
    <div>
        <div class="mx-8 p-4 mb-10 bg-d-color-blue-light-dark rounded"  v-if="collections.length > 0">
            <div class="text-sm font-medium text-center border-b border-gray-700">
                <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2">
                        <span :class="[chooseTab == 1 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                            انتخاب کالکشن
                        </span>
                    </li>
                    <li class="mr-2">
                        <span :class="[chooseTab == 2 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                            انتخاب نوع NFT
                        </span>
                    </li>
                    <li class="mr-2">
                        <span :class="[chooseTab == 3 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                            انتخاب فایل
                        </span>
                    </li>
                    <li class="mr-2">
                        <span :class="[chooseTab == 4 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                        مینت و ثبت اطلاعات
                        </span>
                    </li>
                </ul>
            </div>
            <div class="mt-5" v-if="chooseTab == 1">
                <div class="flex items-center flex-col gap-5">
                    <div class="flex flex-wrap items-center justify-evenly fm:flex-col w-full">
                        <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative" v-for="collection in collections" :key="collection.id">
                            <div :class="['group relative cursor-pointer rounded-lg border border-gray-900', collection_id == collection.id ? '!border-crimson-200 ease-in duration-300' : '']" @click="collectionSelected(collection.id)">
                                <img :src="$store.state.storage+collection.bg_image" class="h-[30rem] fm:h-[20rem] w-full rounded-lg"/>
                                <div class="opacity-50  h-full w-full absolute bg-black top-0 rounded-lg"></div>
                                <div class="flex flex-col justify-between h-full w-full absolute top-0 rounded-lg ">
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
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-5">
                        <Button text="ادامه" @callback="changeTab(2)"></Button>
                    </div>
                </div>
            </div>
            <div class="mt-5" v-else-if="chooseTab == 2">
                <div class="flex items-center flex-col gap-5">
                    <div class="flex fm:flex-col fm:gap-5 items-center justify-around flex-wrap w-full">
                        <div @click="typeSelect('video')" :class="['flex flex-col items-center justify-around overflow-hidden rounded-lg shadow-lg p-8 text-center w-[30%] fm:w-full fd:h-[30rem] bg-d-color-blue-dark cursor-pointer transition-all ease-in duration-300 border', type === 'video' ? 'border-blue-700' : 'border-gray-900']">
                            <span><i class="fab fa-youtube text-[6rem] text-pink-500"></i></span>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl fm:text-md mb-2">ویدیو</div>
                                <div class="font-bold text-sm mb-2 text-gray-400">mp4</div>
                            </div>
                        </div>
                        <div @click="typeSelect('image')" :class="['flex flex-col items-center justify-around overflow-hidden rounded-lg shadow-lg p-8 text-center w-[30%] fm:w-full fd:h-[30rem] bg-d-color-blue-dark cursor-pointer transition-all ease-in duration-300 border', type === 'image' ? 'border-blue-700' : 'border-gray-900']">
                            <span><i class="fas fa-image-polaroid text-[6rem] text-yellow-400"></i></span>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl fm:text-md mb-2">تصویر</div>
                                <div class="font-bold text-sm mb-2 text-gray-400">jpg, jpeg, png, gif</div>
                            </div>
                        </div>
                        <div @click="typeSelect('audio')" :class="['flex flex-col items-center justify-around overflow-hidden rounded-lg shadow-lg p-8 text-center w-[30%] fm:w-full fd:h-[30rem] bg-d-color-blue-dark cursor-pointer transition-all ease-in duration-300 border', type === 'audio' ? 'border-blue-700' : 'border-gray-900']">
                            <span><i class="fas fa-headphones-alt text-[6rem] text-green-500"></i></span>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl fm:text-md mb-2">صوتی</div>
                                <div class="font-bold text-sm mb-2 text-gray-400">mp3, flac, alac</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-5">
                        <Button text="قبلی" @callback="chooseTab = 1"></Button>
                        <Button text="ادامه" @callback="changeTab(3)"></Button>
                    </div>
                </div>
            </div>
            <div class="mt-5" v-else-if="chooseTab == 3">
                <div class="flex items-center flex-col gap-5">
                    <div class="flex justify-around flex-wrap fm:flex-col w-full">
                        <div class="mb-5">
                            <InputFile title="تصویر" @callback="getFile($event)" id="image" alert=" سایز: 20MB | فرمت: JPG,JPEG,PNG,GIF" :key="imageKey"></InputFile>
                            <div v-if="previewImage">
                                <img :src="previewImage" class="w-full h-[12rem]"/>
                            </div>
                        </div>
                        <div class="mb-5" v-if="type === 'audio'">
                            <InputFile title="انتخاب فایل صوتی" @callback="getFile($event,'file')" id="audio" alert="سایز: 50MB | فرمت: MP3" :key="fileKey"></InputFile>
                            <audio class="w-full" v-show="previewFile !== null" controls :src="previewFile"/>
                        </div>
                        <div class="mb-5" v-if="type === 'video'">
                            <InputFile title="انتخاب ویدیو" @callback="getFile($event,'file')" id="video" alert="سایز: 50MB | فرمت: MP4" :key="fileKey"></InputFile>
                            <video v-show="previewFile !== null" controls>
                                <source :src="previewFile" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="flex items-center gap-5">
                        <Button text="قبلی" @callback="chooseTab = 2"></Button>
                        <Button text="ادامه" @callback="changeTab(4)"></Button>
                    </div>
                </div>
            </div>
            <div class="mt-5" v-else-if="chooseTab == 4">
                <div class="flex items-center flex-col gap-5">
                    <div class="mb-5 flex fm:flex-col fd:justify-center w-full">
                        <div  class="w-[50%] fm:w-full">
                            <Error></Error>
                            <div class="mb-5">
                                <Input v-model="title" type="text" label="عنوان" id="title"></Input>
                            </div>
                            <div class="mb-5 border rounded-lg p-5 border-gray-700">
                                <div class="mb-5 flex items-center gap-5">
                                    <span>ویژگی ها</span>
                                    <Button type="button" text="اضافه کردن ویژگی" @callback="addAttribute()" my_class="!rounded-lg"></Button>
                                </div>
                                <div v-for="count in attributeCount" :key="count-1" :class="['flex items-center gap-5 p-2 rounded-lg', attributesRemove === count-1 ? 'bg-red-500' : '']">
                                    <Input v-model="attributeKeys[count-1]" type="text" label="عنوان" :required="false" id="attributeKeys"></Input>
                                    <Input v-model="attributeValues[count-1]" type="text" label="مقدار" :required="false" id="attributeValues"></Input>
                                    <span v-if="attributesRemove === count-1" @click="removeAttribute(count-1)"><i :class="[`text-lg fm:text-sm fas fa-check text-green-500`]"></i></span>
                                    <span v-else @click="removeAttribute(count-1)"><i :class="[`cursor-pointer text-lg fm:text-sm fas fa-trash text-crimson-200`]"></i></span>
                                </div>
                            </div>
                            <div class="mb-5">
                                <Textarea v-model="description" label="توضیحات" id="description" :required="false" :maxlength="1000" :alert="description.length+'/1000'"></Textarea>
                            </div>
                            <div class="mb-5">
                                <Input @keyup.enter="addKeyword($event)" type="text" label="کلمات کلیدی" id="keywords" :required="false" placeholder="بعد از وارد کردن متن اینتر بزنید"></Input>
                                <div v-if="keywords.length > 0" class="rounded-lg w-full p-2 bg-d-color-blue-light mt-2">
                                    <ul class="flex gap-3 flex-wrap items-center">
                                        <li class="bg-d-color-blue-light-dark flex items-center gap-4 px-5 py-2 rounded-lg" v-for="(keyword,index) in keywords" :key="index">
                                            <span class="text-md fm:text-sm">{{keyword}}</span>
                                            <span class="cursor-pointer" @click="removeKeyword(index)"><i class="fas fa-trash text-crimson-200 fm:text-sm text-md p-none m-none"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-5">
                        <Button text="قبلی" @callback="chooseTab = 3"></Button>
                        <Button text="ذخیره و مینت" @callback="btnLoading === false ? save() : ''" :btnLoading="btnLoading" my_class="!from-green-700 !to-green-500"></Button>
                    </div>
                </div>
            </div>
        </div>
        <Modal title="" save=""  ref="mintModal">
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <span v-if="checkSignature">
                        <i class="fas fa-check text-2xl fm:text-sm text-green-500"></i>
                    </span>
                    <span v-else="checkSignature">
                        <svg aria-hidden="true" class="w-[1.2rem] h-[1.2rem] text-white animate-spin fill-crimson-200 !font-bold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </span>
                    <span class="text-lg fm:text-sm">بررسی مالکیت آدرس اتریوم</span>
                </div>
                <div class="flex items-center gap-2">
                    <span v-if="checkMintLoading">
                        <i class="fas fa-check text-2xl fm:text-sm text-green-500"></i>
                    </span>
                    <span v-else="checkMintLoading">
                        <svg aria-hidden="true" class="w-[1.2rem] h-[1.2rem] text-white animate-spin fill-crimson-200 !font-bold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </span>
                    <span class="text-lg fm:text-sm">مینت کردن nft</span>
                </div>
            </div>
        </Modal>
        <Loading :loading="loading"></Loading>
    </div>
</template>

<script>
let signer, market, nft;
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import Error from "@/components/Error"
import Textarea from "@/components/Textarea"
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import InputFile from "@/components/InputFile"
import axios from '@/plugins/axios';
import Toast from '@/plugins/toast';
export default {
    name:'NftStore',
    components:{Button,InputFile,Textarea, Input,Error, Loading, Modal},
    data(){
        return{
            checkMintLoading:false,
            checkSignature:false,
            loading:false,
            chooseTab:1,
            collection_id:'',
            type:'',
            image:'',
            previewImage:null,
            file:'',
            previewFile:null,
            imageKey:0,
            fileKey:0,
            attributeCount:0,
            attributesRemove:null,
            attributeKeys:[],
            attributeValues:[],
            title:'',
            description:'',
            keywords:[],
            collections:[],
            btnLoading:false,
            postId:null
        }
    },
    async mounted() {
        this.getCollections();
        [signer, market, nft] = await this.$store.getters.getContractData;
    },
    methods:{
        async getCollections(){
            this.loading = true;
            await axios.get(this.$store.state.api+"get-collections").then(resp=>{
                this.collections = resp.data.data;
            })
            this.loading = false;
        },
        // Save nft metadata
        async save(){
            this.btnLoading = true;
            let frmData = new FormData();
            frmData.append('collection_id',this.collection_id);
            frmData.append('title',this.title);
            frmData.append('type',this.type);
            frmData.append('image',this.image);
            frmData.append('file',this.file);
            frmData.append('description',this.description);
            frmData.append('keywords[]',this.keywords);
            frmData.append('attributeKeys[]',this.attributeKeys);
            frmData.append('attributeValues[]',this.attributeValues);
            await axios.post(this.$store.state.api+"nft",frmData).then(resp=>{
                this.postId = resp.data.data;
                this.signature()
            }).catch(err=>{
                this.$store.commit('handleError', err)
            })
            this.btnLoading =false;
        },
        // check wallet address signature
        async signature(){
            this.$refs.mintModal.toggleModal()
            await axios.post(this.$store.state.api+'check-signature').then(async resp=>{
                await this.$store.dispatch('sleep',1000);
                this.checkSignature = true;
                this.mint();
            }).catch(err=>{
                this.errorMint('شما مالک این ادرس اتریوم نیستید')
            })
        },
        // mint nft
        async mint(){
            try{
                let result = await nft.connect(signer).mint();
                let wait = await result.wait();
                let token = parseInt(wait.events[2].args[0]._hex);
                let blockHash = wait.blockHash;
                this.checkMintLoading = true;
                Toast.success('با موفیت مینت شد')
                await this.$store.dispatch('sleep',1000);
                this.$refs.mintModal.toggleModal()
                this.emptyData();
            }catch(err) {
                this.errorMint('مینت با خطا مواجه شد', 'mint')
            }
        },
        // If there is an error in the mint or signature, the metadata will be deleted, and if there is an error in the signature, the user will be logged out.
        async errorMint(msg, action=''){
            await this.$store.dispatch('forceDelete',[`nft/${this.postId}`])
            Toast.error(msg)
            this.$refs.mintModal.toggleModal()
            if(action !== 'mint'){
                await this.$store.dispatch('sleep',2000);
                await this.$store.dispatch('logout');
            }
        },
        addKeyword(event){
            this.keywords.push(event.target.value)
            event.target.value = null
        },
        addAttribute(){
            this.attributeCount++;
            this.attributeKeys.push(null);
            this.attributeValues.push(null);
        },
        removeAttribute(count){
            this.attributesRemove = count;
            setTimeout(()=>{
                this.attributeCount--;
                this.attributeKeys = this.attributeKeys.filter((value,key)=>{return key !== count});
                this.attributeValues = this.attributeValues.filter((value,key)=>{return key !== count});
                this.attributesRemove = null;
            },700);
        },
        removeKeyword(keyword){
            this.keywords = this.keywords.filter((value,key)=>{return key !== keyword});
        },
        collectionSelected(id){
            this.collection_id = id;
        },
        changeTab(tab){
            if(tab === 2){
                if(this.collection_id === ''){
                    Toast.info('لطفا کالکشن را انتخاب نمایید');
                    return -1;
                }
            }else if(tab === 3){
                if(this.type === ''){
                    Toast.info('لطفا نوع NFT را انتخاب نمایید');
                    return -1;
                }
            }else if(tab === 4){
                if(this.image === ''){
                    Toast.info('لطفا تصویر را انتخاب نمایید');
                    return -1;
                }
                if(this.type === 'video' || this.type === 'audio'){
                    if(this.file === ''){
                        Toast.info('لطفا فایل ویدیویی یا صوتی را انتخاب نمایید');
                        return -1;
                    }
                }
            }
            this.chooseTab = tab
        },
        typeSelect(type){
            if(type !== this.type){
                this.imageKey += 1;
                this.fileKey += 1;
                this.file = this.image = '';
                this.previewImage = this.previewFile = null;
            }
            this.type = type;
        },
        getFile(event, changeType='image'){
            let file = event.target.files[0];
            if(changeType == "image"){
                this.image = file;
                this.previewImage = URL.createObjectURL(file);
            }else{
                this.file = file;
                this.previewFile = URL.createObjectURL(file)
            }
        },
        emptyData(){
            this.collection_id = '';
            this.title = '';
            this.type = '';
            this.image = '';
            this.description = '';
            this.file = '';
            this.keywords = [];
            this.attributeKeys = [];
            this.attributeValues = [];
            this.attributeCount = this.fileKey = this.imageKey = 0;
            this.previewFile = this.previewImage = null;
            this.checkMintLoading = this.checkSignature = false;
            setTimeout(()=>{
                this.chooseTab = 1;
            },1000)
        }
    }
}
</script>