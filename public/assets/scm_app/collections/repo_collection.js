define(["underscore","backbone"],function(e,t){var r=t.Model.extend({idAttribute:"_id"}),a=t.Collection.extend({model:r,sortKey:"pushed_at",sortOrder:-1,initialize:function(e,t){this.allRepos=t.allRepos},comparator:function(t){var r=function(t){var r=e.map(t.split(""),function(e){return e.charCodeAt()}),a=0;for(i=0,n=r.length;n>i;i++)a+=r[i]*Math.pow(8,n-i);return a},a=t.get(this.sortKey);return("updated_at"==this.sortKey||"pushed_at"==this.sortKey)&&(a=new Date(a).valueOf()),e.isString(a)&&(a=r(a),console.debug(a)),this.sortOrder>0?a:-a},sortByField:function(e,t){console.debug("Sorting repos by: "+e+" order: "+t),this.sortOrder=parseInt(t),this.sortKey=e,this.sort()},filterByField:function(e,t){console.debug("Filtering org: "+this.org_id+" by field "+e+" with value "+t);var n=this.onlyOrgRepos().filter(function(n){return n.get(e)==t},this);return n},onlyOrgRepos:function(){console.log("Filtering orgs by: "+this.org_id);var e=this.allRepos.filter(function(e){return e.get("owner_login")==this.org_id},this);return e},addNewItems:function(e){console.debug(e.length);var t=this.currentPage*this.perPage;console.log("Going to add next items since: "+t),this.totalPages=Math.ceil(e.length/this.perPage);var n=e.slice(t,t+this.perPage);this.add(n,{update:!0})},appendNextPage:function(t){e.isNaN(t)||e.isUndefined(t)||(this.currentPage=t),(e.isNaN(this.currentPage)||e.isUndefined(this.currentPage))&&(console.debug("RepoCollection has no currentPage defined."),this.currentPage=0),(e.isNaN(this.perPage)||e.isUndefined(this.perPage))&&(this.perPage=5);var n=this.onlyOrgRepos();return this.addNewItems(n),this}});return a});