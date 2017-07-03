package handlers

import (
	"github.com/dropbox/godropbox/container/set"
	"github.com/gin-gonic/gin"
	"github.com/pritunl/pritunl-zero/database"
	"github.com/pritunl/pritunl-zero/event"
	"github.com/pritunl/pritunl-zero/settings"
)

type settingsData struct {
	AuthProviders  []string `json:"auth_providers"`
	ElasticAddress string   `json:"elastic_address"`
}

func getSettingsData() *settingsData {
	return &settingsData{
		AuthProviders:  []string{},
		ElasticAddress: settings.Elastic.Address,
	}
}

func settingsGet(c *gin.Context) {
	data := getSettingsData()
	c.JSON(200, data)
}

func settingsPut(c *gin.Context) {
	db := c.MustGet("db").(*database.Database)
	data := &settingsData{}

	err := c.Bind(data)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}

	settings.Elastic.Address = data.ElasticAddress
	err = settings.Commit(db, settings.Elastic, set.NewSet(
		"address",
	))
	if err != nil {
		c.AbortWithError(500, err)
		return
	}

	event.PublishDispatch(db, "settings.change")

	data = getSettingsData()
	c.JSON(200, data)
}
