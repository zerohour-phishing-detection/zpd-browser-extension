/**
 * A warning above the password field telling the user that
 * the extension is still processing the webpage.
 */
class PasswordInputWarning {
  /**
   * Displays the warning on the given password field.
   * 
   * @param {Element} password_field the password field.
   */
  static display(password_field) {
    // Create main div
    let tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltipphish";

    // Add warning text to div
    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltiptext";
    tooltipText.innerHTML =
      "CAUTION: do not enter your details! The anti-phishing plug-in is still running!";
    tooltipDiv.appendChild(tooltipText);
  
    // Position div near password field
    let padding = 30;
    let fieldProps = password_field.getBoundingClientRect();
    let tooltipProps = tooltipDiv.getBoundingClientRect();
    let topPos = fieldProps.top - (tooltipProps.height + padding);

    tooltipDiv.style.cssText =
      "left:" +
      fieldProps.left +
      "px;top:" +
      topPos +
      "px;position:absolute;z-index:100;background: #F4FF47;border-radius:6px;padding: 6px 12px;font-family: arial;font-size: 12px;text-shadow: 0px 1px 1px #000;color: #011a15;";
  
    // Add div to webpage
    let firstChild = document.body.firstChild;
    document.body.insertBefore(tooltipDiv, firstChild);
  }

  /**
   * Remove the notification warnings from the current page.
   */
  static remove() {
    let selector = document.querySelector(".tooltipphish");
    if (selector) {
      selector.remove();
    }
  }

  /**
   * Adds listeners to the given password field to automatically display
   * the warning if needed.
   * 
   * @param {Element} password_field the password field to handle.
   */
  static handle_field(password_field) {
    password_field.addEventListener("focusin", () => {
      if (checkstatus == "PROCESSING") {
        PasswordInputWarning.display_warning(password_field);
      }
    });
  
    password_field.addEventListener("focusout", () => {
      PasswordInputWarning.remove_warnings();
    });
  }
}
