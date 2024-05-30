const data = {
  docs: [
    {
      id: 3,
      fullName: "Meera Shah",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/z6eyxfsvrfgsjs8dfu9s.jpg",
      email: "mshah@example.com",
    },
    {
      id: 1,
      fullName: "Jenil Mangukiya",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/r4erenrw0mcgeq3jycsn.jpg",
      email: "jmangukiya@gmail.com",
    },
    {
      id: 2,
      fullName: "Aarav Patel",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/xkw3yefsdmcxgtr9gydp.jpg",
      email: "apatel@example.com",
    },
    {
      id: 4,
      fullName: "Ravi Mehta",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/qcsgfjsejsysfr6ydytd.jpg",
      email: "rmehta@example.com",
    },
    {
      id: 5,
      fullName: "Neha Desai",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/df6geryrjsfsfrgdfggs.jpg",
      email: "ndesai@example.com",
    },
    {
      id: 6,
      fullName: "Vikram Joshi",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/gsdfgdfsdgfsdfsdgfsd.jpg",
      email: "vjoshi@example.com",
    },
    {
      id: 7,
      fullName: "Priya Reddy",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgdsfdfgdf.jpg",
      email: "preddy@example.com",
    },
    {
      id: 8,
      fullName: "Amit Kumar",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgdfsgsd.jpg",
      email: "akumar@example.com",
    },
    {
      id: 9,
      fullName: "Pooja Nair",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgdfgdfgsdfgsdfsd.jpg",
      email: "pnair@example.com",
    },
    {
      id: 10,
      fullName: "Suresh Gupta",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgdfgsd.jpg",
      email: "sgupta@example.com",
    },
    {
      id: 11,
      fullName: "Kavita Singh",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/dfsdfgdsfsdfgsdfsd.jpg",
      email: "ksingh@example.com",
    },
    {
      id: 12,
      fullName: "Arjun Yadav",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/dfgsdfgsdfgsdfgsd.jpg",
      email: "ayadav@example.com",
    },
    {
      id: 13,
      fullName: "Nisha Chauhan",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdfgsd.jpg",
      email: "nchauhan@example.com",
    },
    {
      id: 14,
      fullName: "Rajesh Kumar",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdffdf.jpg",
      email: "rkumar@example.com",
    },
    {
      id: 15,
      fullName: "Sneha Iyer",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgdsfgsdfgsd.jpg",
      email: "siyer@example.com",
    },
    {
      id: 16,
      fullName: "Ajay Verma",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdfgds.jpg",
      email: "averma@example.com",
    },
    {
      id: 17,
      fullName: "Anjali Pandey",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdfgd.jpg",
      email: "apandey@example.com",
    },
    {
      id: 18,
      fullName: "Rohan Khatri",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdfgdg.jpg",
      email: "rkhatri@example.com",
    },
    {
      id: 19,
      fullName: "Sonia Sharma",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgdsfgsd.jpg",
      email: "ssharma@example.com",
    },
    {
      id: 20,
      fullName: "Tarun Das",
      avatar:
        "https://res.cloudinary.com/tube-backend/image/upload/v1716394683/chatter/sdfgsdfgsdfgsdffg.jpg",
      email: "tdas@example.com",
    },
  ],
};

export const useRequestsSentUserList = () => {
  return {
    isUserListLoading: false,
    usersList: data,
  };
};
