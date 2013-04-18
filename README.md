#VIVO project template
This is a git repository template for working with and customizing [VIVO](http://vivoweb.org/).  It uses the [three tired build approach](https://wiki.duraspace.org/display/VIVO/Building+VIVO+in+3+tiers) documented by the VIVO project.  The project source files (VIVO and Vitro) are tracked using [Git Submodules](http://git-scm.com/book/en/Git-Tools-Submodules).

##Checking out the project and building VIVO in three tiers
~~~~
$ git clone https://github.com/lawlesst/vivo-project-template.git vivo
$ cd vivo
$ git submodule init
$ git submodule update
#Check out specific versions of VIVO and Vitro
$cd VIVO
$git checkout maint-rel-1.5
$cd ../Vitro
$git checkout maint-rel-1.5
#Copy default deploy.properties and edit
$cp default.deploy.properties deploy.properties
#Adjust deploy.properties
#...
#Build and deploy VIVO
$ ant all
~~~~

##Benefits to this approach
 * local changes are separated from core code making upgrades easier.
 * using Git you can checkout any tag release, build it with your local changes, and test it out.
 * using the steps above, you can quickly deploy VIVO to another machine.
 * using the power of Git, you can use tools, like [cherry-pick](http://www.vogella.com/articles/Git/article.html#cherrypick), to select bug fixes or enhancements that are not yet in a VIVO release and incorporate them into your implementation.
 * even if you plan on making few modifications, this can be a convenient and efficient way to manage your custom theme. 

 ##Questions or comments
 Contact lawlesst at gmail.com 
