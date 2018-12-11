import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

// sanity test
test("sanity test", () => {
  return;
});

//snapshot testing
test("renders correctly", () => {
  const wrapper = mount(Stats);
  expect(wrapper.element).toMatchSnapshot();
});

import { mount } from "@vue/test-utils";
import Stats from "@/components/Stats.vue";
import Friends from "@/views/Friends.vue";
import Dashboard from "@/views/Dashboard.vue";
// import Followinglist from "@/components/Followinglist.vue";
// import Followerslist from "@/components/Followerslist.vue";
import AddTournamentPlayers from "@/components/AddTournamentPlayers.vue";

describe("Stats", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(Stats);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("Friends", () => {
  it("is a Vue Instance", () => {
    const wrapper = mount(Friends);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

// // test with assertion
// describe('Rating', () => {
//   const wrapper = shallowMount(Rating, {
//     propsData: {
//       maxStars: 6,
//       grade: 3
//     }
//   })
//   it('renders a list of stars with class `active` equal to prop.grade', () => {
//     // our assertion goes here
//     expect(wrapper.findAll('.active').length).toEqual(3)
//   })
// })

describe("Dashboard.vue", () => {
  it("checking <h1> tag text", () => {
    const wrapper = shallowMount(Dashboard);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Dashboard");
  });
});

// npm run test:unit -> see test in command line

// --------------------------------------------------
// describe("Friends", () => {
//   // let wrapper;
//   // beforeEach(() => (wrapper = shallowMount(Friends)));
//   it("should render a <div />", () => {
//     const wrapper = shallowMount(Friends);
//     expect(wrapper.find("div").length).toEqual(1);
//   });

//   it("should render Follwinglist component", () => {
//     expect(wrapper.containsMatchingElement(Follwinglist)).toEqual(true);
//   });

//   it("should render Follwerslist component", () => {
//     expect(wrapper.containsMatchingElement(Follwerslist)).toEqual(false);
//   });

// it("should mount with state", () => {
//   const wrapper = shallow(<Core1 />);
//   const componentInstance = wrapper.instance();
//   componentInstance.componentDidMount();
//   expect(wrapper.state("goals")).toBe(true);
//   expect(wrapper.state("completed")).toBe(false);
//   expect(wrapper.state("title")).toBe("Title");
//   expect(wrapper.state("number")).toBe("1");
//   expect(wrapper.state("docsURL")).toBe(
//     "https://reactjs.org/docs/components-and-props.html"
//   );
//   expect(wrapper.state("iframe")).toBe("30l5vp4jqq");
//   expect(wrapper.state("module")).toBe("/src/App.js");
// });
// });
// --------------------------------------------------
