import { shallowMount } from "@vue/test-utils";
 
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
  
import MatchBox from "@/components/MatchBox.vue";
import WinnerBox from "@/components/WinnerBox.vue";
import Stats from "@/components/Stats.vue";
import UpcomingTourney from "@/components/UpcomingTourney.vue";
 

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
 