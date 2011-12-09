Ext.setup({
	tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,

onReady: function()
{
	var form; 

    var formBase = {
		id:'formBase',
        scroll: 'vertical',
        standardSubmit : true,
		fullscreen: true,
		renderTo : 'mydiv',
		from1Tpl: new Ext.XTemplate([
        '<div class="demo-weather">',
            '<tpl for=".">',
                '<div class="day">',
                    '<div class="date" onClick="show_rtfrom(\'{cityname}\');">{cityname}</div>',
                   
                '</div>',
            '</tpl>',
        '</div>'
        ]),
		to1Tpl: new Ext.XTemplate([
        '<div class="demo-weather">',
            '<tpl for=".">',
                '<div class="day">',
                    '<div class="date" onClick="show_rtto(\'{cityname}\');">{cityname}</div>',
                   
                '</div>',
            '</tpl>',
        '</div>'
        ]),
        items: [
				{          
					xtype		:	'button',
					text		: 	'Round-Trip',
					name		: 	'Round_Trip',	
					id			:	'Round_Trip',	
					inputValue 	: 	'RT',
					style		:	'width:125; font-size:14px; margin-left:20px;',
					flex		:	1,
					handler  	: 	function(btn)
					{ 
						var btnVal=btn.inputValue;
						
						Ext.getCmp('serachType').setValue(btnVal);
						
						Ext.getCmp('rtr').show();
						Ext.getCmp('rtreturn').show();

						Ext.getCmp('mcf').hide();
						Ext.getCmp('mcfrom').hide();
						Ext.getCmp('mct').hide();
						Ext.getCmp('mcto').hide();
						Ext.getCmp('mcd').hide();
						Ext.getCmp('mcdepdate').hide();
						Ext.getCmp('mcd2').hide();
						Ext.getCmp('mcdepdate2').hide();
						Ext.getCmp('mct2').hide();
						Ext.getCmp('mcto2').hide();
						Ext.getCmp('mcf2').hide();
						Ext.getCmp('mcfrom2').hide();
						Ext.getCmp('serachType').hide();
					}				
				},
				{       
					xtype		:	'button',
					text     	:	'One-Way',
					name	 	:	'One_Way',
					id		 	:	'One_Way',
					inputValue	:	'OW',
					style		:	'width:120; font-size:14px; margin-top:-26; margin-left:160;',
					flex		:	1,
					handler  	: 	function(btn)
					{ 
						var btnVal=btn.inputValue;
						Ext.getCmp('serachType').setValue(btnVal);

						Ext.getCmp('rtr').hide();
						Ext.getCmp('rtreturn').hide();
						Ext.getCmp('mcf').hide();
						Ext.getCmp('mcfrom').hide();
						Ext.getCmp('mct').hide();
						Ext.getCmp('mcto').hide();
						Ext.getCmp('mcd').hide();
						Ext.getCmp('mcdepdate').hide();
						Ext.getCmp('mcd2').hide();
						Ext.getCmp('mcdepdate2').hide();
						Ext.getCmp('mct2').hide();
						Ext.getCmp('mcto2').hide();
						Ext.getCmp('mcf2').hide();
						Ext.getCmp('mcfrom2').hide();
						Ext.getCmp('serachType').hide();
						
					}				
				},	
				{
							xtype		:	"textfield",
							label		:	'serachType',
							name		:	'serachType',
							id			:	'serachType',
				},
				{ 
					xtype: 'fieldset',
					name:'rtf',
					id:'rtf',
					items:	[{							
								xtype		:	'textfield',
								label		:	'From',
								name		:	'rtfrom',
								id			:	'rtfrom',
								placeHolder	:	'Enter City or Airport',
								style		:	'width:100%; float:left;',
								enableKeyEvents : true,															
								listeners       : 
								{
									keyup 	: function(citysearch)
									{
										var x=Ext.getCmp('rtfrom').getValue();
										var c = x.length;
										from1Tpl = formBase.from1Tpl;
										if(c >= 3)
										{						   
											Ext.util.JSONP.request({
													url: '/searchCity.do',
													callbackKey: 'callback',
													params: { key: x},											
													callback: function(result)
													{
														Ext.getCmp('rtfrom1').show();
														var weather = result.data.weather;
														if (weather)
														{	
															var html = from1Tpl.applyTemplate(weather);
															Ext.getCmp('rtfrom1').update(html);   
														}
														Ext.getBody().unmask();
													}
												});
										}
										else
										{
											weather='';
											var html = from1Tpl.applyTemplate(weather);
											Ext.getCmp('rtfrom1').hide();
										}
									}
								}
							}]						
				},
				{
							xtype		:	"textfield",
							name		:	'rtfrom1',
							id			:	'rtfrom1',
							scroll		:	'vertical',
							width		:	'100%'
							
				},
				{ 
					xtype: 'fieldset',
					name:'rtt',
					id:'rtt',
					items:	[{						
								xtype		:	"textfield",	
								label		:	'To',
								name		:	'rtto',
								id			:	'rtto',
								placeHolder	:	'Enter City or Airport',
								style		:	'width:100%; float:left;',
								maskField: true,
								enableKeyEvents : true,															
								listeners       : 
								{
									keyup 	: function(citysearch)
									{
										var x=Ext.getCmp('rtto').getValue();
										var c = x.length;
										to1Tpl = formBase.to1Tpl;
										if(c >= 3)
										{						   
											Ext.util.JSONP.request({
													url: '/searchCity.do',
													callbackKey: 'callback',
													params: { key: x},											
													callback: function(result)
													{
														Ext.getCmp('rtto1').show();
														var weather = result.data.weather;
														if (weather)
														{
															var html = to1Tpl.applyTemplate(weather);
															Ext.getCmp('rtto1').update(html);                        
														}
														Ext.getBody().unmask();
													}
												});
										}
										else
										{
											weather='';
											var html = to1Tpl.applyTemplate(weather);
											Ext.getCmp('rtto1').hide();
										}
									}
								}
							}]
				},
				{
					xtype		:	"textfield",
					name		:	'rtto1',
					id			:	'rtto1',
					scroll		:	'vertical'
				},
				{ 
					xtype: 'fieldset',
					name: 'rtd',
					id:	'rtd',	
					items:[ {
								xtype	:	"datepickerfield",
								label	:	'Depart',
								name	:	'rtdepat',
								id		:	'rtdepat',	
								value : {year: 2011, day: new Date().getDate()+6, month: new Date().getMonth()+1},
								picker	:	{ yearFrom: 2011, yearTo:2012 }
								
										////////
					}]		
							
				},
				{ 
					xtype: 'fieldset',
					name:	'rtr',
					id:	'rtr',
					items: [{
								xtype	:	"datepickerfield",
								label	:	'Return',
								name	:	'rtreturn',
								id		:	'rtreturn',	
								value	:	{year: 2011, day:new Date().getDate()+13, month:new Date().getMonth()+1},
								picker	:	{yearFrom: 2011 , yearTo:2012 }
							}]
               },
					new Ext.form.Spinner({
								name:'rtadult',
								id:'rtadult',
								minValue: 1,
								maxValue: 10,
								incrementValue: 1,
								defaultValue:1,
								cycle: false,
								label:'Adult (12+)'	,
							
								})
							,				
							new Ext.form.Spinner({
								name:'rtchd',
								id:'rtchd',
								minValue: 0,
								maxValue: 10,
								incrementValue: 1,
								cycle: false,
								label:'Children (2+)'								
								})
								,				
							new Ext.form.Spinner({
								name:'rtinf',
								id:'rtinf',
								minValue: 0,
								maxValue: 10,
								incrementValue: 1,
								cycle: false,
								label:'Infants (0-2)'								
								}),
								{
									xtype: 'selectfield',
									name: 'cabin_Class',
									id:'cabin_Class',
									label:'Class',
									options: [
										{text: 'Economy',  value: 'Y'},
										{text: 'Business', value: 'C'},
										{text: 'First', value: 'F'}									
									]
                    },					
					new Ext.Button({
						text: 'Search', 
						ui: 'action', 
						style:'width:100px; margin:0 auto;',
						handler: function()
						{	
							var rtfrom=Ext.getCmp('rtfrom').value;
							var rtffindex = rtfrom.indexOf("(");
							var rtflindex = rtfrom.indexOf(")");
							var from = rtfrom.substring(rtffindex+1,rtflindex);

							var rtto=Ext.getCmp('rtto').value;
							var rttfindex = rtto.indexOf("(");
							var rttlindex = rtto.indexOf(")");
							var to=rtto.substring(rttfindex+1,rttlindex);
							
							var searchType = Ext.getCmp('serachType').getValue();
							if(searchType=="RT")
							{
								if(Ext.getCmp('rtfrom').getValue().length==0)
								{
									
									Ext.Msg.alert('Please Enter From City');
									return false;
								}
								else if(Ext.getCmp('rtto').getValue().length==0)
								{
									
									Ext.Msg.alert('Please Enter To City');
									return false;
								}
								else
								{		
									var rtdepart=Ext.getCmp('rtdepat').value.format('D, M d, Y');                                
									var rtreturn=Ext.getCmp('rtreturn').value.format('D, M d, Y'); 
									
									var b = Ext.get('pre_loading');								
									if (!b.rendered) 
									{	
										Ext.getCmp('formBase').el.mask("<table width='100%' align='center'><tr><td>"+from+" To "+to+"</td></tr><tr><td>"+rtdepart+"</td></tr><tr><td>"+rtreturn+"</td></tr><tr><td>searching.....</td></tr><tr><td><img src=../images/preloader.gif></td></tr></table>",  "x-mask-loading");
									}
									Ext.getCmp('formBase').submit({ url: '/flightSearch.do' });
								}
									
							}
							if(searchType=="OW")
							{
								if(Ext.getCmp('rtfrom').getValue().length==0)
								{
									
									Ext.Msg.alert('Please Enter From City');
									return false;
								}
								else if(Ext.getCmp('rtto').getValue().length==0)
								{
									
									Ext.Msg.alert('Please Enter To City');
									return false;
								}
								else
								{	
									var rtdepart=Ext.getCmp('rtdepat').value.format('D, M d, Y');
									
									var b = Ext.get('pre_loading');								
									if (!b.rendered) 
									{													
										Ext.getCmp('formBase').el.mask("<table width='100%' align='center'><tr><td>"+from+" To "+to+"</td></tr><tr><td>"+rtdepart+"</td></tr><tr><td>searching.....</td></tr><tr><td><img src=../images/preloader.gif></td></tr></table>",  "x-mask-loading");								
									}

									Ext.getCmp('formBase').submit({ url:'/flightSearch.do' });																		
								}	
							}
						//////////
						}
					})
				///////End //////
			],       
            dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [{							 
										style:'background:url(/images/logo.png); height:32px; width:139px; margin:0 auto;',								   
									}]							
						},    
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [{							
										text:'Copyright 2011 GLOBESTER.com',
										style:'margin:0 auto; width:100%; font-size:17px;',								   
									}]							
						}							
						]
			};
		 
        top = new Ext.form.FormPanel(formBase);
        top.show();
				
				Ext.getCmp('serachType').setValue('RT');
				Ext.getCmp('serachType').hide();
				Ext.getCmp('rtfrom1').hide();
				Ext.getCmp('rtto1').hide();

    }
});