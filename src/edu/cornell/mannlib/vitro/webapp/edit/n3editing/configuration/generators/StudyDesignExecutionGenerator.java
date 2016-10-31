/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import static edu.cornell.mannlib.vitro.webapp.modelaccess.ModelNames.DISPLAY;


import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

	  private Log log = LogFactory.getLog(StudyDesignExecutionGenerator.class);	
	  
    @Override
    public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
            HttpSession session) throws Exception {

      EditConfigurationVTwo editConfiguration = new EditConfigurationVTwo();   
      editConfiguration.setTemplate("genericForm.ftl");
      return editConfiguration;
  
    }
}