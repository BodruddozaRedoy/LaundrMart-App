import { Laundry } from "@/types/laundry.types";
import Home from "../assets/icons/home.png";
import Menu from "../assets/icons/menu.png";
import SliderArrow from "../assets/icons/slider-arrow.png";
import AuthWelcome from "../assets/images/auth_welcome.png";
import BotoshLaundry from "../assets/images/Botosh-Laundry.jpg";
import CarBannerOne from "../assets/images/Car-banner 1.png";
import DropOff from "../assets/images/drop-off.png";
import ForgetPassIllustration from "../assets/images/forget-password-illustration.png";
import FullService from "../assets/images/full-service.png";
import ReceiveParcel from "../assets/images/receive-parcel.png";
import SliderLogo from "../assets/images/slider-logo.png";
import Logo from "../assets/images/splash-icon.png";

export const images = {
  AuthWelcome,
  Logo,
  ForgetPassIllustration,
  FullService,
  DropOff,
  ReceiveParcel,
  Home,
  Menu,
  CarBannerOne,
  SliderArrow,
  BotoshLaundry,
  SliderLogo,
};

export const laundries: Laundry[] = [
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
    infoAlert:
      "A $150 authorization hold will be placed on your card. You'll only be charged the final amount.",
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
    serviceOptions: {
      fullService: true,
      dropOff: true,
      pickup: true,
    },
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
    infoAlert:
      "A $100 authorization hold will be placed on your card. You’ll only be billed for the final service cost.",
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
    serviceOptions: {
      fullService: true,
      dropOff: true,
      pickup: true,
    },
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
    infoAlert:
      "A $120 authorization hold will be applied. This will be adjusted to the final total after service completion.",
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
    serviceOptions: {
      fullService: false,
      dropOff: true,
      pickup: true,
    },
  },
];

export const orders = [
  {
    id: "1",
    orderId: "#4253668c",
    date: "Oct 11, 2025",
    address: "Amberkhana, Sylhet",
    customerName: "Bodruddoza Redoy",
    customerPhone: "01758383869",
    bagSize: "small (~5 lbs)",
    canMix: "Yes",
    service: "Full Service",
    weight: "5 Pound",
    deliveryMethod: "Drop-off",
    totalCost: "$35.25",
    pricePerLb: "$1.75",
    serviceFee: "$3.50",
    notes: "Please separate delicates. Cold wash preferred.",
    status: "Request",
    report: {
      title: "Report Details",
      description:
        "Customer requested cold wash for delicates. Shirts and pants cleaned with extra care.",
      images: [
        "https://img.freepik.com/free-photo/black-tshirt_125540-631.jpg?w=740",
        "https://img.freepik.com/free-photo/light-blue-tshirt_53876-102921.jpg?w=740",
        "https://img.freepik.com/free-photo/black-shirt-hanging_144627-21206.jpg?w=740",
      ],
    },
    messages: [
      {
        id: 1,
        title: "Order placed",
        description: "Your order has been received",
        icon: "home-outline",
      },
      {
        id: 2,
        title: "Order accepted by LaundryMart",
        description: "Laundromat confirmed your order",
        icon: "checkmark-circle-outline",
      },
      {
        id: 3,
        title: "Driver assigned for pickup",
        description: "Your laundry has been collected",
        icon: "car-outline",
      },
      {
        id: 4,
        title: "Laundry received",
        description: "Your laundry is being processed",
        icon: "business-outline",
      },
      {
        id: 5,
        title: "Laundry complete",
        description: "Your laundry is ready for pickup/delivery",
        icon: "shirt-outline",
      },
      {
        id: 6,
        title: "Driver assigned for return",
        description: "On the way to you",
        icon: "car-outline",
      },
      {
        id: 7,
        title: "Delivered",
        description: "Order completed",
        icon: "home-outline",
      },
    ],
    driver: {
      name: "John Smith",
      rating: 4.9,
      deliveries: 87,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    laundryMart: {
      name: "Fresh & Clean Laundry",
      rating: 4.8,
      reviews: 156,
      image:
        "https://img.freepik.com/premium-photo/washing-machine-service-shop_35752-2595.jpg?w=740",
    },
  },
  {
    id: "2",
    orderId: "#4253772d",
    date: "Oct 10, 2025",
    address: "Subidbazar, Sylhet",
    bagSize: "medium (~10 lbs)",
    customerName: "Bodruddoza Redoy",
    customerPhone: "01758383869",
    canMix: "Yes",
    service: "Pickup",
    weight: "8 Pound",
    deliveryMethod: "Pickup",
    totalCost: "$48.50",
    pricePerLb: "$1.50",
    serviceFee: "$4.00",
    notes: "Fold and pack neatly. No hangers.",
    status: "Pickup",
    report: {
      title: "Report Details",
      description:
        "Laundry picked up successfully. Verified item count matches pickup request.",
      images: [
        "https://img.freepik.com/free-photo/laundry-basket-with-clean-clothes_23-2148721230.jpg?w=740",
        "https://img.freepik.com/free-photo/man-carrying-laundry-bag_23-2148721211.jpg?w=740",
        "https://img.freepik.com/free-photo/pile-clean-folded-laundry-towels_53876-139897.jpg?w=740",
      ],
    },
    messages: [
      {
        id: 1,
        title: "Order placed",
        description: "Your order has been received",
        icon: "home-outline",
      },
      {
        id: 2,
        title: "Driver assigned for pickup",
        description: "Driver on the way",
        icon: "car-outline",
      },
      {
        id: 3,
        title: "Laundry received",
        description: "Your laundry is being processed",
        icon: "business-outline",
      },
      {
        id: 4,
        title: "Laundry complete",
        description: "Your laundry is ready for delivery",
        icon: "shirt-outline",
      },
      {
        id: 5,
        title: "Delivered",
        description: "Order completed",
        icon: "home-outline",
      },
    ],
    driver: {
      name: "Michael Johnson",
      rating: 4.8,
      deliveries: 112,
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    laundryMart: {
      name: "Speedy Wash",
      rating: 4.7,
      reviews: 98,
      image:
        "https://img.freepik.com/free-photo/modern-self-service-laundry-room-interior_53876-128325.jpg?w=740",
    },
  },
  {
    id: "3",
    orderId: "#4253112a",
    date: "Oct 09, 2025",
    address: "Zindabazar, Sylhet",
    bagSize: "large (~15 lbs)",
    customerName: "Bodruddoza Redoy",
    customerPhone: "01758383869",
    canMix: "No",
    service: "Drop-Off",
    weight: "10 Pound",
    deliveryMethod: "Drop-off",
    totalCost: "$52.00",
    pricePerLb: "$1.50",
    serviceFee: "$5.00",
    notes: "Use eco detergent. No dryer.",
    status: "Processing",
    report: {
      title: "Report Details",
      description:
        "Currently being washed using eco-friendly detergent. Expected completion in 3 hours.",
      images: [
        "https://img.freepik.com/free-photo/industrial-washing-machines-laundry_23-2148721190.jpg?w=740",
        "https://img.freepik.com/free-photo/laundry-room-with-washing-machine_53876-112075.jpg?w=740",
        "https://img.freepik.com/free-photo/washing-machines-line-laundromat_53876-138729.jpg?w=740",
      ],
    },
    messages: [
      {
        id: 1,
        title: "Order placed",
        description: "Your order has been received",
        icon: "home-outline",
      },
      {
        id: 2,
        title: "Order accepted by LaundryMart",
        description: "Laundromat confirmed your order",
        icon: "checkmark-circle-outline",
      },
      {
        id: 3,
        title: "Laundry received",
        description: "Your laundry is being processed",
        icon: "business-outline",
      },
      {
        id: 4,
        title: "Laundry complete",
        description: "Your laundry is ready for pickup",
        icon: "shirt-outline",
      },
    ],
    driver: {
      name: "David Wilson",
      rating: 4.6,
      deliveries: 65,
      image: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    laundryMart: {
      name: "Eco Laundry Hub",
      rating: 4.9,
      reviews: 203,
      image:
        "https://img.freepik.com/free-photo/woman-using-modern-washing-machine_23-2148721191.jpg?w=740",
    },
  },
  {
    id: "4",
    orderId: "#4252999b",
    date: "Oct 08, 2025",
    address: "Tilagor, Sylhet",
    bagSize: "small (~5 lbs)",
    canMix: "Yes",
    customerName: "Bodruddoza Redoy",
    customerPhone: "01758383869",
    service: "Drop-Off",
    weight: "4 Pound",
    deliveryMethod: "Drop-off",
    totalCost: "$25.50",
    pricePerLb: "$1.50",
    serviceFee: "$3.00",
    notes: "Handle with care, contains baby clothes.",
    status: "Delivered",
    report: {
      title: "Report Details",
      description:
        "Order delivered successfully. Customer confirmed all items received in perfect condition.",
      images: [
        "https://img.freepik.com/free-photo/delivery-man-handing-over-parcel_23-2148721208.jpg?w=740",
        "https://img.freepik.com/free-photo/clean-clothes-folded-bed_23-2148721227.jpg?w=740",
        "https://img.freepik.com/free-photo/woman-receiving-package-home_23-2148721223.jpg?w=740",
      ],
    },
    messages: [
      {
        id: 1,
        title: "Order placed",
        description: "Your order has been received",
        icon: "home-outline",
      },
      {
        id: 2,
        title: "Order accepted by LaundryMart",
        description: "Laundromat confirmed your order",
        icon: "checkmark-circle-outline",
      },
      {
        id: 3,
        title: "Laundry received",
        description: "Your laundry is being processed",
        icon: "business-outline",
      },
      {
        id: 4,
        title: "Laundry complete",
        description: "Ready for delivery",
        icon: "shirt-outline",
      },
      {
        id: 5,
        title: "Delivered",
        description: "Order completed successfully",
        icon: "home-outline",
      },
    ],
    driver: {
      name: "Robert Brown",
      rating: 4.9,
      deliveries: 134,
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    laundryMart: {
      name: "Sparkle Wash",
      rating: 4.7,
      reviews: 180,
      image:
        "https://img.freepik.com/free-photo/laundry-basket-clean-clothes_23-2148721210.jpg?w=740",
    },
  },
];
