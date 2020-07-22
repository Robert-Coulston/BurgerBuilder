import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<NavigationItems/>);
    } );

    it('should render 2 ,<NavigationItems/> if not authenticated',
    () => {
        // const wrapper = shallow(<NavigationItems/>) // pass no props ie, isAuthenticated with be false
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 ,<NavigationItems/> if authenticated',
    () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated={true}/>) // pass no props ie, isAuthenticated with be false
        wrapper.setProps({isAuthenticated:true});
        wrapper.find(NavigationItem);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //<NavigationItem link={"/orders"}>Orders</NavigationItem>
    it('should contain Logout if authenticated',
    () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated={true}/>) // pass no props ie, isAuthenticated with be false
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link={"/logout"}>Logout</NavigationItem>)).toEqual(true);
    });
});