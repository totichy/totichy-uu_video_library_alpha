import UU5 from "uu5g04";
import UuVideolibrary from "uu_videolibrary_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuVideolibrary.Routes.AddVideo`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuVideolibrary.Routes.AddVideo />);
    expect(wrapper).toMatchSnapshot();
  });
});
