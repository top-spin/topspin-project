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
import Friends from "@/views/Friends.vue";
// import NewUser from "@/views/NewUser.vue";
// import Geocoder from "@pderas/vue2-geocoder";
// import Profile from "@/views/Profile.vue";
import Dashboard from "@/views/Dashboard.vue";
import Chat from "@/views/Chat.vue";
import Search from "@/views/Search.vue";
import Tournaments from "@/views/Tournaments.vue";
import Followinglist from "@/components/Followinglist.vue";
import Followerslist from "@/components/Followerslist.vue";
import AddTournamentPlayers from "@/components/AddTournamentPlayers.vue";
import MatchBox from "@/components/MatchBox.vue";
import WinnerBox from "@/components/WinnerBox.vue";
import Stats from "@/components/Stats.vue";
import UpcomingTourney from "@/components/UpcomingTourney.vue";
import RecentMatches from "@/components/RecentMatches.vue";
import TopPlayers from "@/components/TopPlayers.vue";

describe("Friends", () => {
  it("is a Vue Instance", () => {
    const wrapper = mount(Friends);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("MatchBox", () => {
  it("is a Vue Instance", () => {
    const wrapper = mount(MatchBox);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("WinnerBox", () => {
  it("is a Vue Instance", () => {
    const wrapper = mount(WinnerBox);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("Stats", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(Stats);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("UpcomingTourney", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(UpcomingTourney);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("RecentMatches", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(RecentMatches);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("TopPlayers", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(TopPlayers);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("Followinglist", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(Followinglist);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
describe("Followerslist", () => {
  it("is a Vue Instance", () => {
    const wrapper = shallowMount(Followerslist);
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

// describe("NewUser.vue", () => {
//   it("checking <h1> tag text", () => {
//     const wrapper = shallowMount(NewUser);
//     const h1 = wrapper.find("h1");
//     expect(h1.text()).toBe("Enter Profile Info");
//   });
// });
// describe("Profile.vue", () => {
//   it("checking <h3> tag text", () => {
//     const wrapper = shallowMount(Profile);
//     const h3 = wrapper.find("h3");
//     expect(h3.text()).toBe("Ranking");
//   });
// });
describe("Dashboard.vue", () => {
  it("checking <h1> tag text", () => {
    const wrapper = shallowMount(Dashboard);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Dashboard");
  });
});
describe("Chat.vue", () => {
  it("checking <h1> tag text", () => {
    const wrapper = shallowMount(Chat);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Chat");
  });
});
// describe("Tournaments.vue", () => {
//   it("checking create tournament button text", () => {
//     const wrapper = shallowMount(Tournaments);
//     wrapper.find("v-btn").trigger("click");
//     expect(wrapper.findAll(".active").length).toEqual(0);
//   });
// });
describe("Search.vue", () => {
  it("checking <h1> tag text", () => {
    const wrapper = shallowMount(Search);
    const h3 = wrapper.find("h3");
    expect(h3.text()).toBe("Players from around the world...");
  });
});
// describe("WinnerBox", () => {
//   it("checking <h4> tag text", () => {
//     const wrapper = shallowMount(WinnerBox);
//     const h4 = wrapper.find("h4");
//     expect(h4.text()).toBe("Winner");
//   });
// });

// npm run test:unit -> see test in command line

// --------------------------------------------------
import Vue from "vue";
import Vuex from "vuex";

describe("Friends", () => {
  // let store;
  // let actions;
  // let state;
  // beforeEach(() => {
  //   state = { data: {} };

  //   actions = {
  //     followingbutton: jest.fn()
  //   };

  //   store = new Vuex.Store({
  //     state,
  //     actions
  //   });
  // });

  it("should turn showfollowing to true.", () => {
    const wrapper = mount(Friends);
    wrapper.find("v-btn").trigger("click");
    expect(wrapper.findAll(".active").length).toEqual(0);
    // expect(wrapper.followingbutton).toBe(true);
    // expect(wrapper.emitted).toBe(true);
    // expect(showfollowing).toBe("true");
  });
});
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
