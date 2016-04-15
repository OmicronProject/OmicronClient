/**
 * Created by Michal on 2016-04-15.
 */
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Reducer, {reducer_factory} from '../reducer';
import { connect } from 'react-redux';

export const CarouselTemplate = ({active_index, items_to_display, direction,
    on_select_direction}) => (
    <Carousel activeIndex={active_index}
              direction={direction}
              onSelect={on_select_direction}
    >
        {items_to_display.map(make_carousel_display)}
    </Carousel>
);

CarouselTemplate.propTypes = {
    active_index: React.PropTypes.number.isRequired,
    items_to_display: React.PropTypes.array.isRequired,
    on_select_direction: React.PropTypes.func.isRequired,
    direction: React.PropTypes.oneOf(['prev', 'next', null])
};

const make_carousel_display = (frame) => (
    <CarouselItem>
        <div className='carousel-content'>
            {frame.content}
        </div>
    </CarouselItem>
);

const map_state_to_props = (state) => ({
    active_index: state.home_page.carousel.selected_item,
    items_to_display: state.home_page.carousel.items_to_display,
    direction: state.home_page.carousel.direction
});

const map_dispatch_to_props = (dispatch) => ({
    on_select_direction: (selected_index, selected_direction) => {
        dispatch(homepage_carousel_move(selected_index, selected_direction))
    }
});

const HOMEPAGE_CAROUSEL_MOVE = "HOMEPAGE_CAROUSEL_MOVE";

const homepage_carousel_move = (index, direction) => ({
    type: HOMEPAGE_CAROUSEL_MOVE,
    selected_index: index,
    selected_direction: direction
});

const homepage_carousel_move_reducer = (state, action) => {
    state.home_page.carousel.direction = action.selected_direction;
    state.home_page.carousel.selected_item = action.selected_index;
};

Reducer.register(
    reducer_factory(HOMEPAGE_CAROUSEL_MOVE)(homepage_carousel_move_reducer)
);

const HomepageCarousel = connect(map_state_to_props, map_dispatch_to_props)(
    CarouselTemplate
);

export default HomepageCarousel;