let Vue
class Hrouter {
    static install(_Vue){
        Vue = _Vue
        Vue.mixin({
            beforeCreate(){
                Vue.prototype.$hrouter = "hahaha"
                //路由的启动
                if(this.$options.router){
                    Vue.prototype.$wfrouter =  this.$options.routers
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options){
        this.$options = options
        this.routerMap = {}
        this.vm = new Vue({
            data: {
                current: '/'
            }
        })
    }
    init(){
        this.bindEvents()
        this.creatRouterMap()
        this.initComponents()
    }
    bindEvents(){
        window.addEventListener("hashchange",this.onHashChange.bind(this),false)
        window.addEventListener("load",this.onHashChange.bind(this),false)
    }
    getFrom(e){
        let from,to;
        if(e.newURL){
            from = e.oldURL.split('#')[1]
            to = e.newURL.split('#')[1]
        }else{
            from = ''
            to = this.getHash()
        }
        return {from, to}
    }
    onHashChange(e){
        let hash = this.getHash()

        let router = this.routerMap[hash]
        let {from, to} = this.getFrom(e);
        if(router.beforeEnter){
            router.beforeEnter(from, to, ()=>{
                this.vm.current = hash
            })
        }else{
            this.vm.current = hash
        }
    }
    getHash(){
        return window.location.hash.slice(1) || '/'
    }
    creatRouterMap(){
        const rMap = this.$options.routes;
        rMap.forEach(item => {
            this.routerMap[item.path] = item
        });
    }
    initComponents(){
        Vue.component('router-view',{
            render: h =>{
                const component = this.routerMap[this.vm.current].component
                return h(component)
            }
        })
        Vue.component('router-link', {
            props:{
                to:String
            },
            render(h){
                return h("a",{
                    attrs:{
                        href: `#${this.to}`
                    }
                },[this.$slots.default, "66"])
            },
        })
    }
    push( url ){
        window.location.hash = url
        // history =>  pushState

    }
}

export default Hrouter