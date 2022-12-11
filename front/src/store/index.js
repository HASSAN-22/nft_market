import { createStore, storeKey } from 'vuex'
import MarketAbi from "../../../contract/artifacts/contracts/Market.sol/Market.json";
import NftAbi from "../../../contract/artifacts/contracts/NFT.sol/NFT.json";
import Address from "@/contractData/address.json";

import MetaMaskLogo from "@/assets/img/MetaMask.png"

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Toast from '@/plugins/toast';
import axios from '@/plugins/axios';
export default createStore({
  state: {
    isCopy:false,
    user:{
      id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
      address:localStorage.getItem('address'),
      username:localStorage.getItem('username'),
      personal_id:localStorage.getItem('personal_id'),
      avatar:localStorage.getItem('avatar'),
      cover_image:localStorage.getItem('cover_image'),
    },
    contract:{
      marketAbi:MarketAbi.abi,
      nftAbi:NftAbi.abi,
      marketAddress:Address.market,
      nftAddress:Address.nft
    },
    providerOptions: {
      injected: {
        display: {
          logo: MetaMaskLogo,
          name: "Metamask",
          description: "اتصال به متامسگ"
        },
        package: null
      },
      walletconnect: {
        display: {
          name: "Walletconnect",
          description: "بارکد را با کیف پول موبایل خود اسکن کنید"
        },
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.VUE_APP_INFURA_ID
        }
      }
    },
    market:null,
    nft:null,
    instance:null,
    provider:null,
    signer:null,
    address:null,
    chainId:null,
    shortAddress:null,
    _web3Modal:null,
    checkConnection:false,
    btnLoading:false,
    openSignatureModal:false,
    signatureStatus:false,
    changeAccount:false,
    api:process.env.VUE_APP_API+'/api/',
    storage:process.env.VUE_APP_API+'/storage/',
    url:process.env.VUE_APP_API,
    errors:[],
  },


  mutations: {
    scrollTop(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    copy(state, text){
      state.isCopy = true;
      navigator.clipboard.writeText(text);
      setTimeout(() => {
          state.isCopy=false;
      }, 2000);
    },
    handleError(state, payload){
      let response = payload.response;
      if(response !== undefined){
          let status = response.status;
          if(status === 422){
              state.errors = Object.values(response.data.errors);
              Toast.warning('لطفا فیلد های مورد نیاز را  تکمیل نمایید')
          }else{
              Toast.error('یک خطای غیر منظره رخ داده است')
              console.log(response);
          }
      }else{
        Toast.error('یک خطای غیر منظره رخ داده است')
        console.log(payload);
      }
      this.commit('scrollTop')
    },
    setStorage(state, payload=true){
      if(payload){
        localStorage.setItem('token', state.user.token);
      }
      localStorage.setItem('id', state.user.id);
      localStorage.setItem('address', state.user.address);
      localStorage.setItem('username', state.user.username);
      localStorage.setItem('personal_id', state.user.personal_id);
      localStorage.setItem('avatar', state.user.avatar);
      localStorage.setItem('cover_image', state.user.cover_image);
    },
    emptyStorage(state){
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('address');
      localStorage.removeItem('username');
      localStorage.removeItem('personal_id');
      localStorage.removeItem('avatar');
      localStorage.removeItem('cover_image');
    }
  },

  actions: {
    async configWeb3Modal({state, dispatch}, payload){
      state.btnLoading = true;
      let providerOptions = payload ? state.providerOptions : [];
      try{
        state._web3Modal = new Web3Modal({
          network: "rinkeby",
          theme: "dark",
          cacheProvider: true,
          providerOptions
        });
      }catch(err){
        dispatch('disconnect')
      }
    },
    async connect({state, dispatch},payload){
      await dispatch('configWeb3Modal', payload)
      if(state._web3Modal.cachedProvider !== '' || payload === true){
        try{
          state.instance = await state._web3Modal.connect();
          state.provider = new ethers.providers.Web3Provider(state.instance);
          setTimeout(() => {}, 1000);
          state.instance.on("accountsChanged", accounts => {
            dispatch('disconnect')
            if(accounts.length > 0 ){
              state.openSignatureModal = state.changeAccount = true;
              state.address = accounts[0].toLowerCase();
            }
          });
          let s = null;
          state.signer = await state.provider.getSigner();
          state.chainId = await parseInt(ethereum.chainId);
          state.address = (await state.signer.getAddress()).toLowerCase();
          if(payload == true || state._web3Modal.cachedProvider === ''){
            state.openSignatureModal = true;
          }
          state.shortAddress = state.address.slice(0,6)+'...'+state.address.slice(-5);
          state.checkConnection = true;
        }catch(err){
          console.log('connection: ',err);
          dispatch('disconnect')
        }
      }else{
        dispatch('disconnect')
      }
    },
    async signatureMessage({state, dispatch}){
      state.signatureStatus = true;
      let rawMessage = process.env.VUE_APP_SIGNATURE_MESSAGE;
      let signedMessage;
      try {
          if (state.instance.wc) {
          signedMessage = await state.provider.send(
                  'personal_sign',
                  [ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(rawMessage)), state.address ]
              );
          }
          else {
              signedMessage = await state.signer.signMessage(rawMessage)
          }
          const verified = ethers.utils.verifyMessage(rawMessage, signedMessage);
          if(verified.toLowerCase() === state.address){
            await dispatch('registerUser',signedMessage);
          }else{
            await dispatch('disconnect', 'امضا با خطا مواجه شد');
            throw new Error(`Error verified`);
          }
          state.openSignatureModal = state.signatureStatus = false;
          if(state.changeAccount){
            setTimeout(() => {
              state.changeAccount = false;
              location.reload();
            }, 1500);
          }
      } catch (error) {
          state.openSignatureModal = state.signatureStatus = false;
          await dispatch('disconnect', 'امضا با خطا مواجه شد');
          console.log('User denied message signature')
          throw new Error(`Script termination`);
      }
    },
    async registerUser({state, dispatch, commit},payload){
      await axios.post(`${state.api}register`, {address:state.address, signature:payload, chainId:state.chainId}).then(resp=>{
        let data = resp.data.data;
        state.user.id = data.id;
        state.user.token = data.token;
        state.user.address = data.address;
        state.user.personal_id = data.personal_id;
        state.user.username = data.username;
        state.user.avatar = data.avatar;
        state.user.cover_image = data.cover_image;
        commit('setStorage');
        Toast.success('اتصال با موفقیت انجام شد');
      }).catch(async err=>{
        if(err.response !== undefined){
          if(err.response.data.message == 'signature is not valid'){
            await dispatch('disconnect', 'امضا معتبر نیست');
          }
        }else{
          await dispatch('disconnect', 'ثبت اطلاعات با خطا مواجه شد');
        }
        throw new Error(`Script termination`);
      })
    },
    async logout({state, dispatch}){
      await axios.post(`${state.api}logout`).then(async resp=>{
        await dispatch('disconnect');
        window.location.href = '/';
      }).catch(async err=>{
        await dispatch('disconnect');
        window.location.href = '/';
      })
    },
    async disconnect({state,commit}, msg=''){
      if(state._web3Modal !== null){
        state._web3Modal.clearCachedProvider();
      }
      state._web3Modal = null;
      state.instance = null;
      state.provider = null;
      state.signer = null;
      state.address = null;
      state.shortAddress = null;
      state.chainId = null;
      state.checkConnection = state.btnLoading = false;
      state.user.address = null;
      state.user.avatar = null;
      state.user.cover_image = null;
      state.user.personal_id = null;
      state.user.token = null;
      state.user.username = null;
      commit('emptyStorage');
      if(msg !== ''){
        Toast.error(msg);
      }
    },
    async checkToken({commit, state, dispatch}){
      let address = localStorage.getItem('address');
      await axios.post(state.api+'check-token',{address: address}).then(resp=>{
        let data = resp.data;
        if(data.message === 'error'){
          dispatch('disconnect')
        }else{
          if(data.signature && data.token_is_expire){
            state.user.id = data.id;
            state.user.address = data.address;
            state.shortAddress = data.address.slice(0,6)+'...'+data.address.slice(-5);
            state.user.personal_id = data.personal_id;
            state.user.username = data.username;
            state.user.avatar = data.avatar;
            state.user.cover_image = data.cover_image;
            commit('setStorage', false)
          }else{
            dispatch('disconnect')
          }
        }
      }).catch(err=>{
        dispatch('disconnect')
      });
    },
    async forceDelete({state},payload){
      axios.delete(state.api+payload[0]).then(resp=>{}).catch(err=>{
        console.log('forceDeleteError')
      })
    },
    async sleep({state},payload=700) {
      await new Promise(resolve => setTimeout(resolve, payload));
    },
  },
  getters: {
    async getContractData(state){
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = await provider.getSigner();
      let market = await new ethers.Contract(state.contract.marketAddress , state.contract.marketAbi, signer);
      let nft = await new ethers.Contract(state.contract.nftAddress, state.contract.nftAbi , signer);
      return [signer, market, nft];
    },
    getToken(state){
      return state.user.token ? state.user.token : localStorage.getItem('token');
    },
    isNull: (state) => (data, needle) => {
      return data !== null ? data[needle] : null;
    },
  },
})
