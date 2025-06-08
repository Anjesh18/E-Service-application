import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

export default function CategoryCarousel() {
  const services = [
    "Carpenter",
    "Plumber",
    "Painter",
    "BabySitter",
    "Washer",
    "Laundry",
  ];
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {services.map((service, idx) => {
           return <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={idx}>
              <Button variant="outline" className="rounded-full">
                {service}
              </Button>
            </CarouselItem>;
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
