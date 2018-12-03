/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

jees.Layout = new jees.EX.LayoutManager( "layout", "layout");
jees.Config = new jees.EX.ConfigManager( "config", "config");
jees.Skins = new jees.EX.SkinManager( "skins" );
jees.Resource = new jees.FileLoadManager( "resource" );

this.jees.mod = {};