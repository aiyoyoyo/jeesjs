/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

jees.Layout = new jees.EX.LayoutManager( "layout", "layout");
jees.Config = new jees.EX.ConfigManager( "config", "config");
jees.Images = new jees.FileLoadManager( "images" );
jees.Skins = new jees.EX.SkinManager( "skins" );

this.jees.mod = {};