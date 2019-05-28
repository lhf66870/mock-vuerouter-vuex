/**
 * ? 为什么不使用 import Vue from 'vue'
 * ! 插件里面导入加大打包的体积，install 自带 vue 缓存一下即可
 */
// 路由入口
let Vue;
class HRouter {
    static install(_Vue){
        // 别的地方要使用cue
        Vue = _Vue
        Vue.mixin({
            beforeCreate(){
                // console.log(this.$options)
                Vue.prototype.$hrouter= "哈哈哈"
                // 启动路由
                // 路由跳转
                if(this.$options.router){
                    Vue.prototype.$wfrouter= this.$options.router
                    //这里是入口具备router配置执行初始化
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options){
        this.$options = options;
        this.routeMap = {}
        // 使用路由的响应式机制，路由切换做出对应响应
        this.vm = new Vue({
            data: {
                // 默认根目录
                current: '/'
            }
        })
    }
    init(){
        // 初始化路由
        /**
         * init 是由插件use来启动 
         * 我们需要做的事情：
         *  -1.监听 hashchange 事件
         *  -2.处理路由表
         *  -3.初始化 router-view router-link
         * 
         *   生命周期，路由守卫
         */
        this.bindEvents()
        this.creatRouterMap()
        // console.log(this.routeMap)
        this.initComponent()
    }
    // *监听 hashchange 事件
    bindEvents(){
        console.log('====================================');
        console.log("绑定事件");
        console.log('====================================');
        window.addEventListener("hashchange", this.onHashChange.bind(this), false);
        window.addEventListener("load", this.onHashChange.bind(this), false);
    }
    // *处理路由表
    creatRouterMap(){
        const rMap = this.$options.routes;
        rMap.forEach( item => {
            this.routeMap[item.path] = item
        })
    }
    // *初始化 router-view router-link
    initComponent(){
        // router-view
        Vue.component('router-view', {
            render: h => {
                const component = this.routeMap[this.vm.current].component
                return h(component)
            }
        })
        Vue.component('router-link', {
            props:{
                to:String
            },
            render(h){
                // 组件名，参数，子元素
                return h('a',{
                    attrs: {
                        href:`#${this.to}`
                    },
                },
                [this.$slots.default,"6"])
            }
            // You are using the runtime-only build of Vue where the template compiler is not available
            // template 转换成 render 执行 ，需要compile编译
            // template:"<a :href='to'><slot></slot></a>"
        })
    }
    // 获取from
    getFrom(e){
        let from,to;
        if(e.newURL){
            // 这是一个hashchange
            from = e.oldURL.split('#')[1];
            to = e.newURL.split('#')[1]
        }else{
            // 这是第一次加载触发
            from = '';
            to = this.getHash()
        }
        return {from, to}
    }
    // @处理 hash 变化事件
    onHashChange(e){
        // 获取当前hash值
        let hash = this.getHash()

        // 路由守卫实现
        let router = this.routeMap[hash];
        let {from, to} = this.getFrom(e)
        if(router.beforeEnter){
            router.beforeEnter(from, to, ()=>{
                alert()
                this.vm.current = hash
            })
        }else{
            this.vm.current = hash
        }
        // 修改this.vm.current,借助 vue 的响应式机制
        this.vm.current = hash
    }
    getHash(){
        return window.location.hash.slice(1) || '/'
    }
    push(url){
        // hash模式直接赋值
        window.location.hash = url
        // history 模式使用 pushState
    }
}

export default HRouter