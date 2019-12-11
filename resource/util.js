class Util {

    checkHours(hoursLog, hours) {
        if (isNaN(hours) || hours < 0.0 || hours > 99.9) {
            return false;
        }
        else {
            /*Check for billable hours to be less than hours log*/
            if (hours <= hoursLog) {
              return true;
            }
            else
              return false;
        }
    }

    checkDate(moment, dateTxt) {
        /*Valid dates within last one year*/
        let dateDiff = moment().diff(moment(dateTxt, 'YYYY-MM-DD', true), 'days');
        if (dateDiff >= 0 && dateDiff < 366)
          return true;
      
        return false;
    }

    getlogTimeDlgObj(triggerId, url, optArray) {
      let logTimeDlgObj = {
        "trigger_id": triggerId,
        "url": url + 'logTime',
        "dialog": {
          "callback_id": "log_time_dlg",
          "title": "Log time for work package",
          "icon_url": url + 'getLogo',
          "elements": [{
            "display_name": "Work package",
            "name": "work_package",
            "type": "select",
            "options": optArray
          },
          {
            "display_name": "Date",
            "name": "spent_on",
            "type": "text",
            "placeholder": "YYYY-MM-DD"
          },
          {
            "display_name": "Comment",
            "name": "comments",
            "type": "textarea",
            "help_text": "Please mention comments if any",
            "optional": true
          },
          {
            "display_name": "Select Activity",
            "name": "activity",
            "type": "select",
            "options": [
              {
                "text": "Development",
                "value": "opt3"
              },
              {
                "text": "Management",
                "value": "opt1"
              },
              {
                "text": "Specification",
                "value": "opt2"
              },
              {
                "text": "Testing",
                "value": "opt4"
              },
              {
                "text": "Support",
                "value": "opt5"
              },
              {
                "text": "Other",
                "value": "opt6"
              },
            ]
          },
          {
            "display_name": "Billable hours",
            "name": "billable_hours",
            "type": "text",
            "placeholder": "hours like 0.5, 1, 3 ..."
          }],
          "submit_label": "Log time",
          "notify_on_cancel": true
        }
      }
  
      return logTimeDlgObj;
    }

    getWpOptJSON(url, optArray) {
      let optJSON = {
        "response_type": "in_channel",
        "message": "Select a project",
        "props": {
          "attachments": [
            {
              "actions": [
                {
                  "name": "Select a project...",
                  "integration": {
                    "url": url + "projSel",
                    "context": {
                      "action": "showTimeLogDlg"
                    }
                  },
                  "type": "select",
                  "options": optArray
                }]
            }
          ]
        }
      };
      return optJSON;
    }
}

module.exports = Util;