package service

import (
	"git/inspursoft/board/src/common/model"
	"git/inspursoft/board/src/common/utils"
)

var devOpsOpt = utils.GetConfig("DEVOPS_OPT")
var devOpsRegistries map[string]DevOps

type CommitItem struct {
	PathWithName string
	Content      string
}

type DevOps interface {
	SignUp(user model.User) error
	CreateAccessToken(username string, password string) (string, error)
	CommitAndPush(repoName string, isRemoved bool, username string, email string, items ...CommitItem) error
	ConfigSSHAccess(username string, token string, publicKey string) error
	CreateRepoAndJob(userID int64, projectName string) error
	ForkRepo(forkedUser model.User, baseRepoName string) error
	CreatePullRequestAndComment(username, ownerName, repoName, repoToken, compareInfo, title, message string) error
	DeleteRepo(username string, repoName string) error
}

func CurrentDevOps() DevOps {
	return devOpsRegistries[devOpsOpt()]
}

func init() {
	devOpsRegistries = make(map[string]DevOps)
	devOpsRegistries["legacy"] = LegacyDevOps{}
	devOpsRegistries["gitlab"] = GitlabDevOps{}
}
