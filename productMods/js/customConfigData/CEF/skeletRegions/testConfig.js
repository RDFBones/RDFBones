var testConfig = {

	uri : 'http://purl.obolibrary.org/obo/FMA_46565',
	label : 'Skull',
	boneDivisions : [ {

		label : 'Viscerocranium',
		uri : 'http://purl.obolibrary.org/obo/FMA_53673',
		existing : [
		  {
			  label : "viscerocranium1",
			  uri : "123456",
			  systemicParts : [
			       {
			    	label : "hyioidbone1",
			     	uri : "123456",
			     	type : 'http://purl.obolibrary.org/obo/FMA_52749',
			     	completeness : "123sdkdl",
			       }
			 ], 
		  },{
			  label : "viscerocranium2",
			  uri : "123456",
			  systemicParts : [
			       {
			    	label : "hyioidbone1",
			     	uri : "123456",
			     	type : 'http://purl.obolibrary.org/obo/FMA_9711',
			     	completeness : "123sdkdl",
			       }
			 ],  
		  }         
		],
		systemicParts : [ {

			label : 'Hyoid bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52749',
		}, {

			label : 'Ethmoid',
			uri : 'http://purl.obolibrary.org/obo/FMA_52740',
		}, {
			label : 'Mandible',
			uri : 'http://purl.obolibrary.org/obo/FMA_52748',
		}, {

			label : 'Vomer',
			uri : 'http://purl.obolibrary.org/obo/FMA_9710',
		}, {

			label : 'Sphenoid bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52736',
		},

		],
		symmetricBones : [ {

			subClasses : [ {

				label : 'Left maxilla',
				uri : 'http://purl.obolibrary.org/obo/FMA_53650',
			}, {

				label : 'Right maxilla',
				uri : 'http://purl.obolibrary.org/obo/FMA_53649',
			},

			],
			label : 'Maxilla',
			uri : 'http://purl.obolibrary.org/obo/FMA_9711',
		}, {

			subClasses : [ {

				label : 'Right inferior nasal concha',
				uri : 'http://purl.obolibrary.org/obo/FMA_54737',
			}, {

				label : 'Left inferior nasal concha',
				uri : 'http://purl.obolibrary.org/obo/FMA_54738',
			},

			],
			label : 'Inferior nasal concha',
			uri : 'http://purl.obolibrary.org/obo/FMA_54736',
		}, {

			subClasses : [ {

				label : 'Left temporal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52739',
			}, {

				label : 'Right temporal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52738',
			},

			],
			label : 'Temporal bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52737',
		}, {

			subClasses : [ {

				label : 'Right lacrimal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53645',
			}, {

				label : 'Left lacrimal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53646',
			},

			],
			label : 'Lacrimal bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52741',
		}, {

			subClasses : [ {

				label : 'Left nasal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53648',
			}, {

				label : 'Right nasal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53647',
			},

			],
			label : 'Nasal bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52745',
		}, {

			subClasses : [ {

				label : 'Right palatine bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53655',
			}, {

				label : 'Left palatine bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_53656',
			},

			],
			label : 'Palatine bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52746',
		}, {

			subClasses : [ {

				label : 'Right zygomatic bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52892',
			}, {

				label : 'Left zygomatic bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52893',
			},

			],
			label : 'Zygomatic bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52747',
		},

		],
	}, {

		label : 'Neurocranium',
		uri : 'http://purl.obolibrary.org/obo/FMA_53672',
		systemicParts : [ {

			label : 'Frontal bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52734',
		}, {

			label : 'Occipital bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_52735',
		},

		],
		symmetricBones : [ {

			subClasses : [ {

				label : 'Right parietal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52788',
			}, {

				label : 'Left parietal bone',
				uri : 'http://purl.obolibrary.org/obo/FMA_52789',
			},

			],
			label : 'Parietal bone',
			uri : 'http://purl.obolibrary.org/obo/FMA_9613',
		},

		],
	},

	],
}