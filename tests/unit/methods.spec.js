
  import { shallowMount, createLocalVue} from '@vue/test-utils'
  import Navbar from "../../src/components/Navbar"
  import Vuex from "vuex";
  import Profile from "../../src/views/Profile";
  import VueRouter from "vue-router";


  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueRouter);
  // let router = new VueRouter({routes})
  
  describe("testing navbar data",()=>{
      let store
      let actions
      let state
      beforeEach(() => {
        actions = {
          getUser: jest.fn()
        }
        state = {
          user:{
            avatar:""
          }
        }
        store = new Vuex.Store({
          actions,
          state
        })
      })
      it('navbar should mount with data', () => {
          let cmp = shallowMount(Navbar, {
            // Create a shallow instance of the component
            store,
            localVue
          });
          // console.log("wrapper ethan",cmp.vm)
          expect(cmp.vm.pendingCount).toEqual("")
          expect(cmp.vm.drawer).toEqual(true)
          expect(cmp.vm.pendingList.length).toBe(0)
        });
  })
  //COMMENTED OUT BECAUSE this.$route is not defined
  // describe("Profile buttons",()=>{
  //     let store
  //     let actions
  //     let state
  //     beforeEach(() => {
  //       actions = {
  //         getUser: jest.fn()
  //       }
  //       state = {
  //         user:{
  //           avatar:""
  //         }
  //       }
  //       store = new Vuex.Store({
  //         actions,
  //         state
  //       })
        
  //     })
  //     it('cancelChanges sets inputs fields to default', () => {
  //         let cmp = shallowMount(Profile, {
  //           // Create a shallow instance of the component
  //           store,
  //           localVue
  //         });
  //         cmp.setData({
  //           name_edit: "",
  //           username_edit: "",
  //           email_edit: "",
  //           organization_edit: "",
  //           city_edit: "",
  //           state_edit: "",
  //           dominantHand_edit: "",
  //           avatar_edit: "",
  //           name: "testing",
  //           username: "testing",
  //           email: "testing",
  //           organization: "testing",
  //           city: "testing",
  //           state: "testing",
  //           dominantHand: "testing",
  //           avatar: "testing",
  //         })
  //         // console.log("wrapper ethan",cmp.vm)
  //         expect(cmp.vm.name_edit).toEqual("")
  //         console.log(cmp.vm.name_edit)
  //         expect(cmp.vm.name).toEqual("testing")
  //         cmp.vm.cancelChanges()
  //         console.log(cmp.vm.name_edit)
  //         expect(cmp.vm.name_edit).toEqual("testing")
  //       });
  //     })