import Home from "../assets/icons/home.png";
import Menu from "../assets/icons/menu.png";
import AuthWelcome from "../assets/images/auth_welcome.png";
import DropOff from "../assets/images/drop-off.png";
import ForgetPassIllustration from "../assets/images/forget-password-illustration.png";
import FullService from "../assets/images/full-service.png";
import ReceiveParcel from "../assets/images/receive-parcel.png";
import Logo from "../assets/images/splash-icon.png";
import CarBannerOne from "../assets/images/Car-banner 1.png";
import SliderArrow from "../assets/icons/slider-arrow.png";
import BotoshLaundry from "../assets/images/Botosh-Laundry.jpg";

export const images = {
  AuthWelcome,
  Logo,
  ForgetPassIllustration,
  FullService,
  DropOff,
  ReceiveParcel,
  Home,
  location,
  Menu,
  CarBannerOne,
  SliderArrow,
  BotoshLaundry,
};

export const laundries = [
  {
    id: "1",
    name: "Botosh Laundry",
    rating: 4.9,
    distance: "2.1 mi away",
    location: "456 Market St, San Francisco, CA",
    description:
      "Botosh Laundry offers premium wash and fold services with eco-friendly detergents. Our team ensures your clothes are spotless, fresh, and ready for pickup or delivery. We pride ourselves on quick service, excellent care, and affordable prices.",
    price: "$1.75",
    turnaround: "2-3 days",
    hours: "Open · Closes 10PM",
    image:
      "https://img.freepik.com/premium-photo/washing-machine-service-shop_35752-2595.jpg?semt=ais_hybrid&w=740&q=80",
    services: [
      {
        name: "Wash & Fold",
        image:
          "https://img.freepik.com/free-photo/fresh-laundry-basket-clean-clothes_23-2148721222.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$1.75 /lb",
      },
      {
        name: "Dry Cleaning",
        image:
          "https://img.freepik.com/free-photo/iron-hanging-clean-shirts-laundry_23-2148721217.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$3.50 /item",
      },
      {
        name: "Ironing Service",
        image:
          "https://img.freepik.com/free-photo/ironing-clean-shirt_23-2148721204.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$2.00 /item",
      },
    ],
    storeHours: [
      { weekday: "Monday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Tuesday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Wednesday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Thursday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Friday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Saturday", time: "9:00 AM - 5:00 PM" },
      { weekday: "Sunday", time: "Closed" },
    ],
  },
  {
    id: "2",
    name: "DondeChaka Laundry",
    rating: 4.8,
    distance: "1.8 mi away",
    location: "792 Castro Ave, San Jose, CA",
    description:
      "DondeChaka Laundry combines fast service with professional care. From everyday washing to delicate dry cleaning, we use modern machines and premium fabric softeners to keep your clothes in perfect condition. Customer satisfaction is our top priority.",
    price: "$1.25",
    turnaround: "1-2 days",
    hours: "Open · Closes 9PM",
    image:
      "https://img.freepik.com/premium-photo/picture-washing-machines-big-showroom_259150-11994.jpg?semt=ais_hybrid&w=740&q=80",
    services: [
      {
        name: "Wash & Fold",
        image:
          "https://img.freepik.com/free-photo/woman-putting-clothes-washing-machine_23-2148721214.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$1.25 /lb",
      },
      {
        name: "Dry Cleaning",
        image:
          "https://img.freepik.com/free-photo/dry-cleaner-pressing-shirt_23-2148721210.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$3.00 /item",
      },
      {
        name: "Pickup & Delivery",
        image:
          "https://img.freepik.com/free-photo/man-delivering-clean-clothes_23-2148721205.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$5.00 /order",
      },
    ],
    storeHours: [
      { weekday: "Monday", time: "8:30 AM - 8:30 PM" },
      { weekday: "Tuesday", time: "8:30 AM - 8:30 PM" },
      { weekday: "Wednesday", time: "8:30 AM - 8:30 PM" },
      { weekday: "Thursday", time: "8:30 AM - 8:30 PM" },
      { weekday: "Friday", time: "8:30 AM - 8:30 PM" },
      { weekday: "Saturday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Sunday", time: "9:00 AM - 5:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Zandhu Laundry",
    rating: 4.7,
    distance: "3.5 mi away",
    location: "102 Green St, Fremont, CA",
    description:
      "Zandhu Laundry is a trusted neighborhood spot for spotless results. Our expert team provides affordable wash, dry, and fold services, plus special care for delicate garments. With modern equipment and attention to detail, your laundry is always in safe hands.",
    price: "$1.50",
    turnaround: "2-3 days",
    hours: "Open · Closes 10PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BXEXGolJTcftc59VS8ljzR-xNi1VcIAH9g&s",
    services: [
      {
        name: "Wash & Fold",
        image:
          "https://img.freepik.com/free-photo/close-up-clean-towels-laundry_23-2148721199.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$1.50 /lb",
      },
      {
        name: "Ironing Service",
        image:
          "https://img.freepik.com/free-photo/woman-ironing-clothes-laundry_23-2148721224.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$2.25 /item",
      },
      {
        name: "Blanket Cleaning",
        image:
          "https://img.freepik.com/free-photo/laundry-basket-clean-bed-linen_23-2148721215.jpg?semt=ais_hybrid&w=740&q=80",
        price: "$4.50 /item",
      },
    ],
    storeHours: [
      { weekday: "Monday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Tuesday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Wednesday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Thursday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Friday", time: "9:00 AM - 6:00 PM" },
      { weekday: "Saturday", time: "10:00 AM - 5:00 PM" },
      { weekday: "Sunday", time: "Closed" },
    ],
  },
];

