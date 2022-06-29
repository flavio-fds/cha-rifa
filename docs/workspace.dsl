workspace {

    model {
        buyer = person "Buyer"

        rifaSystem = softwareSystem "Rifa Online" {
            ui = container "User Interface" {
                description "User interface of the rifa online."
                technology "HTML, CSS and JavaScript"
            }

            httpService = container "Web Application" {
                description "Rifa online web application."
                technology "Next.js"

                orm = component "ORM" {
                    technology "Prisma"
                }
                migration = component "Migration" {
                    description "Migration script"
                    technology "Prisma"
                }
                rifaModule = component "Rifa Module" {
                    description "The rifa module"
                    technology "Next.js"
                }
                buyerModule = component "Buyer Module" {
                    description "The buyer module"
                    technology "Next.js"
                }
            }

            database = container "Database" {
                description "Application's relational database."
                technology "Relational database schema"
                tags "Database"
            }
        }

        # relationships between people and software systems
        buyer -> rifaSystem "Uses"
        buyer -> ui "Interacts with"

        # relationships between containers
        ui -> httpService "Access" "HTTPS"
        httpService -> database "Reads from and writes to" "MySQL Protocol/SSL"

        # relationships between components
        orm -> database
        migration -> orm
        rifaModule -> orm
        buyerModule -> orm

        deploymentEnvironment "Live" {
            deploymentNode "Web Browser" {
                technology "Chrome, Firefox, Edge, Safari"
                containerInstance ui
            }

            deploymentNode "Cloud Services" {
                deploymentNode "Cloud Region: AWS sa-east-1, São Paulo, Brazil" {
                    technology "AWS and other cloud providers running on AWS"

                    deploymentNode "Vercel" {
                        description "Serverless web application deployment."
                        containerInstance httpService
                    }
                    deploymentNode "PlanetScale" {
                        description "MySQL-compatible serverless database platform."
                        containerInstance database
                    }
                }
            }
        }
    }

    views {
        systemContext rifaSystem {
            include *
            autolayout lr
        }

        container rifaSystem {
            include *
            autolayout lr 400 400
        }

        component httpService {
            include *
            autolayout tb
        }

        deployment rifaSystem "Live" {
            include *
            autolayout lr 600 600
        }

        styles {
            element "Element" {
                shape Roundedbox
                background #ffffff
            }
            element "Person" {
                shape Person
                color #ffffff
                background #08427b
            }
            element "Database" {
                shape Cylinder
            }
            element "Infrastructure Node" {
                shape RoundedBox
            }
        }
    }
}
