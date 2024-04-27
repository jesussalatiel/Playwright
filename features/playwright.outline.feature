Feature: Playwright multi docs


  Background: Navigation
    Given I create a new user with the following information:
      | code | mobile            | name    | lastName | middleName | motherLastName | email                  | document_type | document_number            |
      | +52  | set:random:mobile | Capitán | Nuñez    |            | Bolañoz        | local:default:settings | DNI           | set:random:document_number |

  @debug
  Scenario Outline: Changing theme to required mode - 1
    Given Go to the playwright "https://playwright.dev"
    When Change theme to "<ThemeOne>" mode
    Then Snapshot "<ThemeOne>"
    When Change theme to "<ThemeTwo>" mode
    Then Snapshot "<ThemeTwo>"

    Examples:
      | ThemeOne | ThemeTwo |
      | dark     | light    |