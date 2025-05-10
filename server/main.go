package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"loomtales/config"
	"loomtales/controllers"
	"loomtales/database"
	"loomtales/models"
	"net/http"
	"os"
	"time"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file, will use system environment")
	}

	log.Println("Version: ", os.Getenv("VERSION"))

	if !database.Init() {
		log.Printf("Connected to MongoDB URI: Failure")
		return
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(static.Serve("/", static.LocalFile("./dist", true)))

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"POST", "GET", "PATCH", "OPTIONS", "DELETE"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.AllowCredentials = true
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	api := router.Group("/api")
	{
		api.GET("/version", func(c *gin.Context) {
			c.JSON(http.StatusOK, models.Response{
				Data: "Storyrow Api v" + os.Getenv("VERSION"),
			})
			return
		})

		api.GET("/default", controllers.CreateDefaultData)

		api.POST("/register", controllers.SignUp)
		api.POST("/login", controllers.SignIn)
		api.GET("/refresh-token", controllers.RefreshToken)
		api.POST("/activate", controllers.Activate)
		api.POST("/forgot-password", controllers.ForgotPassword)
		api.PATCH("/update-password", controllers.UpdatePassword)

		api.POST("/member/invite/confirm", controllers.ConfirmMemberInvitation)

		protected := api.Group("/", config.AuthMiddleware())
		{
			front := protected.Group("/front")
			{
				front.GET("/sidebar-menu", controllers.GetUserFrontSidebarMenus)
			}

			protected.GET("/profile", controllers.GetProfile)
			protected.PATCH("/profile", controllers.UpdateProfile)
			protected.POST("/resend/confirmation", controllers.ResendConfirmation)

			protected.GET("/media", controllers.GetMedias)
			protected.POST("/media", controllers.CreateMedia)
			protected.GET("/media/:id", controllers.GetMediaById)
			protected.PATCH("/media/:id", controllers.UpdateMedia)
			protected.DELETE("/media/:id", controllers.DeleteMedia)

			protected.POST("/member/invite", controllers.InviteMember)
			protected.PATCH("/member/resend-invite/:invitationId", controllers.ResendMemberInvitation)
			protected.GET("/member/:workspaceId", controllers.GetMembers)
			protected.PATCH("/member/role", controllers.UpdateMemberRole)

			protected.GET("/role", controllers.GetRoles)
			protected.GET("/role/:id", controllers.GetRoleById)
			protected.POST("/role/attach-permission", controllers.AttachPermissionsToRole)

			protected.GET("/user", controllers.GetUsers)
			protected.POST("/user", controllers.CreateUser)
			protected.GET("/user/:id", controllers.GetUserById)
			protected.PATCH("/user/:id", controllers.UpdateUser)
			protected.DELETE("/user/:id", controllers.DeleteUser)

			protected.GET("/workspace", controllers.GetWorkspaces)
			protected.POST("/workspace", controllers.CreateWorkspace)
			protected.GET("/workspace/:id", controllers.GetWorkspaceById)
			protected.PATCH("/workspace/:id", controllers.UpdateWorkspace)
			protected.DELETE("/workspace/:id", controllers.DeleteWorkspace)

			protected.POST("/upload", controllers.UploadFile)

			admin := protected.Group("/admin", config.AdminMiddleware())
			{
				adminFront := admin.Group("/front")
				{
					adminFront.GET("/sidebar-menu", controllers.GetFrontSidebarMenus)
					adminFront.POST("/sidebar-menu", controllers.CreateFrontSidebarMenus)
					adminFront.GET("/sidebar-menu/:id", controllers.GetFrontSidebarMenu)
					adminFront.PATCH("/sidebar-menu/:id", controllers.UpdateFrontSidebarMenu)
					adminFront.DELETE("/sidebar-menu/:id", controllers.DeleteFrontSidebarMenu)
				}

				admin.GET("/permission", controllers.GetPermissions)
				admin.POST("/permission", controllers.CreatePermission)
				admin.PATCH("/permission", controllers.UpdatePermission)
				admin.DELETE("/permission/:ids", controllers.DeletePermission)

				admin.POST("/role", controllers.CreateRole)
				admin.PATCH("/role/:id", controllers.UpdateRole)
				admin.DELETE("/role/:id", controllers.DeleteRole)

				admin.GET("/setting", controllers.GetSettings)
				admin.POST("/setting", controllers.CreateSetting)
				admin.GET("/setting/:id", controllers.GetSettingById)
				admin.PATCH("/setting/:id", controllers.UpdateSetting)
				admin.DELETE("/setting/:id", controllers.DeleteSetting)
			}
		}
	}

	port := "8000"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	err = router.Run(":" + port)
	if err != nil {
		return
	}
}
