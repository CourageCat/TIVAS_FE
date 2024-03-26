import Home from "~/pages/Home";
import Search from "~/pages/Search";
import ListingDetails from "~/pages/ListingDetails";
import TimeshareRentals from "~/pages/TimeshareRentals";
import Policy from "~/pages/Policy";
import ProjectDetail from "~/pages/ProjectDetail";
import LayoutAdmin from "~/pages/LayoutAdmin";
import AdminProjectStatistic from "~/pages/AdminProjectStatistic";
import AdminCreateProject from "~/pages/AdminCreateProject";
import ProfileLayout from "~/pages/ProfileLayout";
import Profile from "~/components/Layouts/Profile";
import RoomTypeDetail from "~/components/RoomTypeDetail";
import ChangePassword from "~/components/ChangePassword";
import AdminManageUser from "~/pages/AdminManageUser";
import AdminManageProject from "~/pages/AdminManageProject";
import AdminProjectDetail from "~/pages/AdminProjectDetail";
import Banking from "~/components/Layouts/Banking";
import AdminRoomTypeDetail from "~/pages/AdminRoomTypeDetail";
import TimeshareDetail from "~/pages/TimeshareDetail";
import Purchase from "~/components/Purchase";
import AdminUserBanList from "~/components/UserBanList";
import AdminManageTypeRoom from "~/pages/AdminManageTypeRoom";
import AdminManageUserTicket from "~/pages/AdminManageUserTicket";
import AdminCreateTypeRoom from "~/pages/AdminCreateTypeRoom";
import AdminManageTimeshare from "~/pages/AdminManageTimeshare";
import WishList from "~/pages/WishList";
import ReviewProjectDetail from "~/pages/ReviewProjectDetail";
import UserHistory from "~/components/UserHistory";
import AdminManageUserFeedback from "~/pages/AdminManageUserFeedback";
import AdminHistory from "~/pages/AdminHistory";
import AdminShowStage from "~/pages/AdminShowStage";
import AdminHistoryTimeshares from "~/pages/AdminHistoryTimeshares";
import AdminBeforeCloseBooking from "~/pages/AdminBeforeCloseBooking";
import AdminProjectInReservation from "~/pages/AdminProjectInReservation";
import AdminHistoryAllUserBuyTimeshare from "~/pages/AdminHistoryAllUserBuyTimeshare";

const routes = [
    {
        path: "/",
        component: Home,
        layout: null,
    },
    {
        path: "/search/:type",
        component: Search,
        layout: null,
    },
    {
        path: "/projectdetail/:id",
        component: ProjectDetail,
        layout: null,
    },

    {
        path: "/user/account/profile",
        component: Profile,
        layout: ProfileLayout,
    },

    {
        path: "/user/account/purchase/:status",
        component: Purchase,
        layout: ProfileLayout,
    },

    {
        path: "/user/account/history",
        component: UserHistory,
        layout: ProfileLayout,
    },

    {
        path: "/user/account/banking",
        component: Banking,
        layout: ProfileLayout,
    },

    {
        path: "/listings",
        component: ListingDetails,
        layout: null,
    },
    {
        path: "/timesharerentals/:id",
        component: TimeshareRentals,
        layout: null,
    },
    {
        path: "/policy",
        component: Policy,
        layout: null,
    },

    {
        path: "/user/account/changepassword",
        component: ChangePassword,
        layout: ProfileLayout,
    },

    {
        path: "/room-type-detail",
        component: RoomTypeDetail,
        layout: null,
    },

    {
        path: "/listingdetails",
        component: ListingDetails,
        layout: null,
    },

    {
        path: "/timesharedetail",
        component: TimeshareDetail,
        layout: null,
    },
    {
        path: "/statistic/:id",
        component: AdminProjectStatistic,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/createproject",
        component: AdminCreateProject,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/user/manageuser/ban",
        component: AdminManageUser,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/user/userbanlist",
        component: AdminUserBanList,
        layout: LayoutAdmin,
    },

    {
        path: "/listingdetails",
        component: ListingDetails,
        layout: null,
    },
    {
        path: "/timesharedetail/:id",
        component: TimeshareDetail,
        layout: null,
    },

    {
        path: "/admin/manageuser/ban",
        component: AdminManageUser,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/projectdetail",
        component: AdminProjectDetail,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/typeroomdetail",
        component: AdminRoomTypeDetail,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/projectdetail",
        component: AdminProjectDetail,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/managetyperoom/:id",
        component: AdminManageTypeRoom,
        layout: LayoutAdmin,
    },
    {
        path: "/listingdetails",
        component: ListingDetails,
        layout: null,
    },
    {
        path: "/timesharedetail/:id",
        component: TimeshareDetail,
        layout: null,
    },

    {
        path: "/admin/createproject",
        component: AdminCreateProject,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/listproject",
        component: AdminManageProject,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/typeroomdetail",
        component: AdminRoomTypeDetail,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/projectdetail/:id",
        component: AdminProjectDetail,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/createtyperoom/:id",
        component: AdminCreateTypeRoom,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/managetimeshare/:projectID",
        component: AdminManageTimeshare,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageuser/listuser",
        component: AdminManageUser,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/ticket/:id",
        component: AdminManageUserTicket,
        layout: LayoutAdmin,
    },

    {
        path: "/wishlist",
        component: WishList,
        layout: null,
    },
    {
        path: "/admin/createproject/reviewprojectdetail",
        component: ReviewProjectDetail,
        layout: null,
    },

    {
        path: "/admin/manageuser/userfeedbacks",
        component: AdminManageUserFeedback,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/history",
        component: AdminHistory,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/showstage/:id",
        component: AdminShowStage,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/soldtimeshares/:id",
        component: AdminHistoryTimeshares,
        layout: LayoutAdmin,
    },
    {
        path: "/admin/manageproject/projectinreservation",
        component: AdminProjectInReservation,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/beforeclosebooking/:id",
        component: AdminBeforeCloseBooking,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageuser/ticket/:id",
        component: AdminManageUserTicket,
        layout: LayoutAdmin,
    },

    {
        path: "/admin/manageproject/userbuytimeshare/:id",
        component: AdminHistoryAllUserBuyTimeshare,
        layout: LayoutAdmin,
    },
];

export default routes;
