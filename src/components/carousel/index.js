import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiElementCarousel = (props) => {
  const { data, navigateTo } = props;
  return (
    <Carousel
      data-testid="multiCarousel"
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 6,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 4,
          partialVisibilityGutter: 30,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {data.map((show, index) => {
        return (
          <div
            onClick={() => navigateTo(show)}
            key={index}
            data-testid={`show-${show.id}`}
          >
            <img src={show.image.medium} style={{ marginBottom: "5vh" }} />
          </div>
        );
      })}
    </Carousel>
  );
};

const FullWidthCarousel = (props) => {
  const { data, navigateTo } = props;
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
        },
      }}
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {data
        // .filter(
        //   (thing, index, self) =>
        //     index === self.findIndex((t) => t.id === thing.id)
        // )
        .map((show, index) => {
          return (
            <div
              onClick={() => navigateTo(show.entries[0])}
              style={{ marginBottom: "5vh" }}
              key={index}
            >
              <img
                src={show.entries[0].image.medium}
                style={{
                  display: "block",
                  height: "35vh",
                  width: "100%",
                }}
              />
            </div>
          );
        })}
    </Carousel>
  );
};
export { FullWidthCarousel, MultiElementCarousel };
