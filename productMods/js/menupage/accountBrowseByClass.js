/* $This file is distributed under the terms of the license in /doc/license.txt$ */

var assignedToAccount = false;

var browseByVClass = {
    // Initial page setup
		
	/*
	 * This function will be called from the loaded individuals
	 */	
	
	addInidividualToAccount : function(individualURI){
		
		 
	}
		
    onLoad: function() {
        this.mergeFromTemplate();
        this.initObjects();
        this.bindEventListeners();
        this.defaultVClass();
    },
    
    // Add variables from menupage template
    mergeFromTemplate: function() {
        $.extend(this, menupageData);
        $.extend(this, i18nStrings);
    },
    
    // Create references to frequently used elements for convenience
    initObjects: function() {
        
    	this.classSelector = $('#vgraph-classes');
    	this.individuals = $('#individuals');
        
    	this.individualsContainer = $('#individuals-in-class');
    },
    
    // Event listeners. Called on page load
    bindEventListeners: function() {
        // Listeners for vClass switching
        this.classSelector.change(function() {
            var uri = $(this).find('option:selected').text();
            
        });
		

        this.browseVClassLinks.click(function() {
            var uri = $(this).attr('data-uri');
            browseByVClass.getIndividuals(uri);
            return false;
        });
  
    },
    
    // Load individuals for default class as specified by menupage template
    defaultVClass: function() {
    	
    	console.log("dafaultVClass");
    	
        if ( this.defaultBrowseVClassURI != "false" ) {
            if ( location.hash ) {
                // remove the trailing white space
                location.hash = location.hash.replace(/\s+/g, '');                
                this.getIndividuals(location.hash.substring(1,location.hash.length), "all", 1, false);
            }
            else {
                this.getIndividuals(this.defaultBrowseVClassUri, "all", 1, false);
            }
        }
    },
    
    // Where all the magic happens -- gonna fetch me some individuals
    getIndividuals: function(vclassUri, alpha, page, scroll) {
    	
    	var url = this.dataServiceUrl + encodeURIComponent(vclassUri);
        if ( alpha && alpha != "all") {
            url += '&alpha=' + alpha;
        }
        if ( page ) {
            url += '&page=' + page;
        } else {
            page = 1;
        }
        if ( typeof scroll === "undefined" ) {
            scroll = true;
        }
        
        // Scroll to #menupage-intro page unless told otherwise
        if ( scroll != false ) {
            // only scroll back up if we're past the top of the #browse-by section
            var scrollPosition = browseByVClass.getPageScroll();
            var browseByOffset = $('#browse-by').offset();
            if ( scrollPosition[1] > browseByOffset.top) {
                $.scrollTo('#menupage-intro', 500);
            }
        }
        
        console.log("getIndividuals - getJSON");
    	
        $.getJSON(url, function(results) {
        	
        	console.log(JSON.stringify(results));
        	
            var individualList = "";
            
            // Catch exceptions when empty individuals result set is returned
            // This is very likely to happen now since we don't have individual counts for each letter and always allow the result set to be filtered by any letter
            if ( results.individuals.length == 0 ) {
                browseByVClass.emptyResultSet(results.vclass, alpha)
            } else {
                var vclassName = results.vclass.name;
                $.each(results.individuals, function(i, item) {
                    var individual = results.individuals[i];
                    individualList += individual.shortViewHtml;
                })

                // Remove existing content
                browseByVClass.wipeSlate();
                
                // And then add the new content
                browseByVClass.individualsInVClass.append(individualList);
                
                // Check to see if we're dealing with pagination
                if ( results.pages.length ) {
                    var pages = results.pages;
                    browseByVClass.pagination(pages, page);
                }
            }
            
            // Set selected class, alpha and page
            // Do this whether or not there are any results
            $('h3.selected-class').text(results.vclass.name);
            browseByVClass.selectedVClass(results.vclass.URI);
            browseByVClass.selectedAlpha(alpha);
        });
    },
    
   
    
    
    // Toggle the active class so it's clear which is selected
    selectedVClass: function(vclassUri) {
        // Remove active class on all vClasses
        $('#browse-classes li a.selected').removeClass('selected');
        
        // Add active class for requested vClass
        $('#browse-classes li a[data-uri="'+ vclassUri +'"]').addClass('selected');
    },

    // Toggle the active letter so it's clear which is selected
    
    // Wipe the currently displayed individuals, no-content message, and existing pagination
    wipeSlate: function() {
        browseByVClass.individualsInVClass.empty();
        $('p.no-individuals').remove();
        $('.pagination').remove();
    },
    
    // When no individuals are returned for the AJAX request, print a reasonable message for the user
    emptyResultSet: function(vclass, alpha) {
        var nothingToSeeHere;
        
        this.wipeSlate();
        var alpha = this.selectedAlpha(alpha);
        
        if ( alpha != "all" ) {
            nothingToSeeHere = '<p class="no-individuals">' + browseByVClass.thereAreNo + ' ' + vclass.name + ' ' + browseByVClass.indNamesStartWith + ' <em>'+ alpha.toUpperCase() +'</em>.</p> <p class="no-individuals">' + browseByVClass.tryAnotherLetter + '</p>';
        } else {
            nothingToSeeHere = '<p class="no-individuals">' + browseByVClass.thereAreNo + ' ' + vclass.name + ' ' + browseByVClass.indsInSystem + '</p> <p class="no-individuals">' + browseByVClass.selectAnotherClass + '</p>';
        }

        browseByVClass.individualsContainer.prepend(nothingToSeeHere);   
    }
    
};

$(document).ready(function() {
    browseByVClass.onLoad();
});