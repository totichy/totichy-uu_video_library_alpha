import UU5 from "uu5g04";
import UuVideolibrary from "uu_videolibrary_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuVideolibrary.Bricks.VideoCreate`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuVideolibrary.Bricks.VideoCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
