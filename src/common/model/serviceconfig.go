package model

import "git/inspursoft/board/src/common/model/yaml"

type ServiceConfig struct {
	ServiceID      int64           `json:"service_id" orm:"column(id)"`
	ProjectID      int64           `json:"project_id" orm:"column(project_id)"`
	ProjectName    string          `json:"project_name"`
	Phase          string          `json:"service_config_phase"`
	ImageList      []string        `json:"service_image_list"`
	ServiceYaml    yaml.Service    `json:"service_yaml"`
	DeploymentYaml yaml.Deployment `json:"deployment_yaml"`
}

type ServiceConfigImage struct {
	ServiceID int64 `json:"service_config_id" orm:"column(service_id)"`
	ImageID   int64 `json:"service_image_id" orm:"column(image_id)"`
}

type PortsServiceYml struct {
	Port       string
	Tagertport string
	Nodeport   string
}

type SelectorServiceYml struct {
	App string
}

type ServiceStructYml struct {
	ApiVersion string `yaml:"apiVersion,flow"`
	Kind       string
	Metadata   struct {
		Name   string
		Lables struct {
			App string
		}
	}
	Spec struct {
		Tpe      string               `yaml:"type,flow,omitempty"`
		Ports    []PortsServiceYml    `yaml:",omitempty"`
		Selector []SelectorServiceYml `yaml:",omitempty"`
	} `yaml:",omitempty"`
}

type PortsDeploymentYml struct {
	ContainerPort int `yaml:"ContainerPort,flow"`
}

type VolumeMountDeploymentYml struct {
	Name      string
	MountPath string `yaml:"MountPath,flow"`
}

type EnvDeploymentYml struct {
	Name  string
	Value string
}

type VolumesDeploymentYml struct {
	Name string
	Nfs  struct {
		Server string
		Path   string
	}
}

type ContainersDeploymentYml struct {
	Name       string
	Image      string
	Workingdir string   `yaml:",omitempty"`
	Command    []string `yaml:",omitempty"`
	Resource   struct {
		Request struct {
			Cpu    string `yaml:",omitempty"`
			Memory string `yaml:",omitempty"`
		}
	} `yaml:",omitempty"`
	Ports       []PortsDeploymentYml       `yaml:",omitempty"`
	VolumeMount []VolumeMountDeploymentYml `yaml:"VolumeMount,omitempty,flow"`
	Env         []EnvDeploymentYml         `yaml:",omitempty"`
}

type DeploymentStructYml struct {
	ApiVersion string `yaml:"apiVersion,flow"`
	Kind       string
	Metadata   struct {
		Name string
	} `yaml:",omitempty"`
	Spec struct {
		Replicas int `yaml:",omitempty"`
		Template struct {
			Metadata struct {
				Lables struct {
					App string
				} `yaml:",omitempty"`
			} `yaml:",omitempty"`
			Spec struct {
				Volumes    []VolumesDeploymentYml    `yaml:",omitempty"`
				Containers []ContainersDeploymentYml `yaml:",omitempty"`
			} `yaml:",omitempty"`
		} `yaml:",omitempty"`
	} `yaml:",omitempty"`
}
