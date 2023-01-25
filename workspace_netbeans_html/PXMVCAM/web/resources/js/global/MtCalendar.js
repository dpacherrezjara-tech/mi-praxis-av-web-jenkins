/**
 * @author: remicioluis
 * @site: remicioluis.com
 */
Ext.define('Ext.global.MtCalendar',{
    extend: 'Ext.Component',
    alias: 'widget.MtCalendar',
    border: false,
    initComponent: function(){
        var me = this;

        var vhtml = '';

        if ( me.fuente == 'ARC' ){
            vhtml+='<div class="mt-calendar">';
               vhtml+='<div class="mt-header" align="right">';
                    vhtml+='<div align="center" style="width: 700px !important;">    ';
                        vhtml+='<span style="display: block !important; margin: 10px !important; font-size: 18px;">Cycle CAT Output</span>';
                    vhtml+='</div>';
                    vhtml+='<div>';
                        vhtml+='<div style="width: 40px;"></div>';
                        vhtml+='<div style="width: 35px;"></div>';
                        vhtml+='<div style="width: 35px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;">1</div>';
                        vhtml+='<div style="width: 65px;">2</div>';
                        vhtml+='<div style="width: 65px;">3</div>';
                        vhtml+='<div style="width: 69px;">4</div>';
                        vhtml+='<div style="width: 65px;">5</div>';
                        vhtml+='<div style="width: 65px;">6</div>';
                        vhtml+='<div style="width: 65px;">7</div>';
                        vhtml+='<div style="width: 65px;">Weekly</div>';
                        vhtml+='<div style="width: 75px;"></div>';
                    vhtml+='</div>';
                    vhtml+='<div>';
                        vhtml+='<div style="width: 40px;"></div>';
                        vhtml+='<div style="width: 35px;"></div>';
                        vhtml+='<div style="width: 35px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div class="mt-bg-day" style="background-color: #E5ECEF">';
                            vhtml+='<div style="width: 134px;">Cycles 4 & 5 are Null</div>';
                        vhtml+='</div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;"></div>';
                        vhtml+='<div style="width: 65px;">CAT</div>';
                        vhtml+='<div style="width: 75px;">Disbursement</div>';
                    vhtml+='</div>';
                    vhtml+='<div>';
                        vhtml+='<div style="width: 40px;">Qtr</div>';
                        vhtml+='<div style="width: 35px;">Mo</div>';
                        vhtml+='<div style="width: 35px;">Wk</div>';
                        vhtml+='<div style="width: 65px;">PED</div>';
                        vhtml+='<div class="mt-bg-day">';
                            vhtml+='<div style="width: 65px;">Friday</div>';
                            vhtml+='<div style="width: 65px;">Saturday</div>';
                            vhtml+='<div style="width: 65px;">Sunday</div>';
                            vhtml+='<div style="width: 65px;">Monday</div>';
                            vhtml+='<div style="width: 65px;">Tuesday</div>';
                            vhtml+='<div style="width: 65px;">Wednesday</div>';
                            vhtml+='<div style="width: 65px;">Thursday</div>';
                            vhtml+='<div style="width: 65px;">Thursday</div>';
                        vhtml+='</div>';
                        vhtml+='<div style="width: 75px;">Date</div>';
                    vhtml+='</div>';
                vhtml+='</div>';

                // console.log(me.items.length);

                Ext.Object.each(me.items, function(index, value){
                    vhtml+='<div class="mt-content" align="right">';
                    vhtml+='<div class="mt-items01" style="width: 40px;">' + value.VALOR + '</div>';
                    vhtml+='<div class="mt-items02">';
                    Ext.Object.each(value.QTR, function(index01, value01){
                        Ext.Object.each(value01.MONTHS, function(index02, value02){
                            vhtml+='<div>';
                                vhtml+='<div style="width: 35px;">' + value02.VALOR + '</div>';
                                vhtml+='<div>';
                                var data01, data02, data03, data04, data05, data06, data07, data08, data09, data10;
                                // console.log(ids);
                                Ext.Object.each(value02.WK, function(index03, value03){

                                    data01 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-WEEK' + '-' + value03.WEEK_COMMELW + '-' + value03.WEEK_COMMIAP + '-' + value03.WEEK_COMMIAR + '-' + value03.WEEK_CANT + '-' + value03.WEEK_ERROR + '-' + value03.WEEK_CANTSALE + '-' + value03.WEEK_CANTELW + '-' + value03.WEEK_CANTIAP + '-' + value03.WEEK_CANTIAR + '-' + value03.WEEK )

                                    data02 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-PED' + '-' + value03.PED_COMMELW + '-' + value03.PED_COMMIAP + '-' + value03.PED_COMMIAR + '-' + value03.PED_CANT + '-' + value03.PED_ERROR + '-' + value03.PED_CANTSALE + '-' + value03.PED_CANTELW + '-' + value03.PED_CANTIAP + '-' + value03.PED_CANTIAR + '-' + value03.PED )

                                    data03 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-FRIDAY' + '-' + value03.FRIDAY_COMMELW + '-' + value03.FRIDAY_COMMIAP + '-' + value03.FRIDAY_COMMIAR + '-' + value03.FRIDAY_CANT + '-' + value03.FRIDAY_ERROR + '-' + value03.FRIDAY_CANTSALE + '-' + value03.FRIDAY_CANTELW + '-' + value03.FRIDAY_CANTIAP + '-' + value03.FRIDAY_CANTIAR + '-' + value03.FRIDAY )

                                    data04 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-SATURDAY' + '-' + value03.SATURDAY_COMMELW + '-' + value03.SATURDAY_COMMIAP + '-' + value03.SATURDAY_COMMIAR + '-' + value03.SATURDAY_CANT + '-' + value03.SATURDAY_ERROR + '-' + value03.SATURDAY_CANTSALE + '-' + value03.SATURDAY_CANTELW + '-' + value03.SATURDAY_CANTIAP + '-' + value03.SATURDAY_CANTIAR + '-' + value03.SATURDAY )

                                    data05 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-SUNDAY' + '-' + value03.SUNDAY_COMMELW + '-' + value03.SUNDAY_COMMIAP + '-' + value03.SUNDAY_COMMIAR + '-' + value03.SUNDAY_CANT + '-' + value03.SUNDAY_ERROR + '-' + value03.SUNDAY_CANTSALE + '-' + value03.SUNDAY_CANTELW + '-' + value03.SUNDAY_CANTIAP + '-' + value03.SUNDAY_CANTIAR + '-' + value03.SUNDAY )

                                    data06 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-MONDAY' + '-' + value03.MONDAY_COMMELW + '-' + value03.MONDAY_COMMIAP + '-' + value03.MONDAY_COMMIAR + '-' + value03.MONDAY_CANT + '-' + value03.MONDAY_ERROR + '-' + value03.MONDAY_CANTSALE + '-' + value03.MONDAY_CANTELW + '-' + value03.MONDAY_CANTIAP + '-' + value03.MONDAY_CANTIAR + '-' + value03.MONDAY )

                                    data07 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-TUESDAY' + '-' + value03.TUESDAY_COMMELW + '-' + value03.TUESDAY_COMMIAP + '-' + value03.TUESDAY_COMMIAR + '-' + value03.TUESDAY_CANT + '-' + value03.TUESDAY_ERROR + '-' + value03.TUESDAY_CANTSALE + '-' + value03.TUESDAY_CANTELW + '-' + value03.TUESDAY_CANTIAP + '-' + value03.TUESDAY_CANTIAR + '-' + value03.TUESDAY )

                                    data08 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-WEDNESDAY' + '-' + value03.WEDNESDAY_COMMELW + '-' + value03.WEDNESDAY_COMMIAP + '-' + value03.WEDNESDAY_COMMIAR + '-' + value03.WEDNESDAY_CANT + '-' + value03.WEDNESDAY_ERROR + '-' + value03.WEDNESDAY_CANTSALE + '-' + value03.WEDNESDAY_CANTELW + '-' + value03.WEDNESDAY_CANTIAP + '-' + value03.WEDNESDAY_CANTIAR + '-' + value03.WEDNESDAY )

                                    data09 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-THURSDAY1' + '-' + value03.THURSDAY1_COMMELW + '-' + value03.THURSDAY1_COMMIAP + '-' + value03.THURSDAY1_COMMIAR + '-' + value03.THURSDAY1_CANT + '-' + value03.THURSDAY1_ERROR + '-' + value03.THURSDAY1_CANTSALE + '-' + value03.THURSDAY1_CANTELW + '-' + value03.THURSDAY1_CANTIAP + '-' + value03.THURSDAY1_CANTIAR + '-' + value03.THURSDAY1 )

                                    data10 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-THURSDAY2' + '-' + value03.THURSDAY2_COMMELW + '-' + value03.THURSDAY2_COMMIAP + '-' + value03.THURSDAY2_COMMIAR + '-' + value03.THURSDAY2_CANT + '-' + value03.THURSDAY2_ERROR + '-' + value03.THURSDAY2_CANTSALE + '-' + value03.THURSDAY2_CANTELW + '-' + value03.THURSDAY2_CANTIAP + '-' + value03.THURSDAY2_CANTIAR + '-' + value03.THURSDAY2 )

                                    vhtml+='<div>';
                                        vhtml+='<div style="width: 35px; border-left: 1px solid #6CB6E7;"><a name="link-item-calendar" id="' + 'link-' + ( data01 ) + '" href="#" style="' + me.getColor(value03.WEEK_COLOR) + '" >' + value03.WEEK + '</a></div>';
                                        vhtml+='<div style="width: 65px;"><a name="link-item-calendar" id="' + 'link-' + ( data02 ) + '" href="#" style="' + me.getColor(value03.PED_COLOR) + '" >' + value03.PED + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data03 ) + '" href="#" style="' + me.getColor(value03.FRIDAY_COLOR) + '" >' + value03.FRIDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data04 ) + '" href="#" style="' + me.getColor(value03.SATURDAY_COLOR) + '" >' + value03.SATURDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data05 ) + '" href="#" style="' + me.getColor(value03.SUNDAY_COLOR) + '" >' + value03.SUNDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; background-color: #C8B3A4; margin-right: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data06 ) + '" href="#" style="' + me.getColor(value03.MONDAY_COLOR) + '" >' + value03.MONDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; background-color: #C8B3A4; margin-left: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data07 ) + '" href="#" style="' + me.getColor(value03.TUESDAY_COLOR) + '" >' + value03.TUESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data08 ) + '" href="#" style="' + me.getColor(value03.WEDNESDAY_COLOR) + '" >' + value03.WEDNESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data09 ) + '" href="#" style="' + me.getColor(value03.THURSDAY1_COLOR) + '" >' + value03.THURSDAY1 + '</a></div>';
                                        vhtml+='<div style="width: 65px;"><a name="link-item-calendar" id="' + 'link-' + ( data10 ) + '" href="#" style="' + me.getColor(value03.THURSDAY2_COLOR) + '" >' + value03.THURSDAY2 + '</a></div>';
                                    vhtml+='</div>'; 

                                });
                                vhtml+='</div>';
                                vhtml+='<div>';

                                Ext.Object.each(value02.DISB, function(index04, value04){
                                    vhtml+='<div style="border-left: 1px solid #6CB6E7; width: 75px;"><span>' + value04.VALOR + '</span></div>';
                                }); 
                                vhtml+='</div>';  
                                    
                            vhtml+='</div>';
                        });
                    });
                    vhtml+='</div>';
                    vhtml+='</div>';
                });

            vhtml+='</div>';

            this.html = vhtml;

            this.listeners = {
                scope: this,
                afterrender: function(){
                    var me = this;
                    me.addEvtListener();
                }
            };
        }else if( me.fuente == 'ASR' ){
            vhtml+='<div class="mt-calendar" style="width: 590px !important;">';
               vhtml+='<div class="mt-header" align="right">';
                    vhtml+='<div align="center">    ';
                        vhtml+='<span style="display: block !important; margin: 10px !important; font-size: 18px;">ASR CALENDAR ' + me.year + '</span>';
                    vhtml+='</div>';
                    vhtml+='<div>';
                        vhtml+='<div style="width: 40px;">Qtr</div>';
                        vhtml+='<div style="width: 35px;">Mo</div>';
                        vhtml+='<div style="width: 35px;">Wk</div>';
                        vhtml+='<div class="mt-bg-day">';
                            vhtml+='<div style="width: 65px;">Monday</div>';
                            vhtml+='<div style="width: 65px;">Tuesday</div>';
                            vhtml+='<div style="width: 65px;">Wednesday</div>';
                            vhtml+='<div style="width: 65px;">Thursday</div>';
                            vhtml+='<div style="width: 65px;">Friday</div>';
                            vhtml+='<div style="width: 65px;">Saturday</div>';
                            vhtml+='<div style="width: 65px;">Sunday</div>';
                        vhtml+='</div>';
                    vhtml+='</div>';
                vhtml+='</div>';

                // console.log(me.items.length);

                Ext.Object.each(me.items, function(index, value){
                    vhtml+='<div class="mt-content" align="right">';
                    vhtml+='<div class="mt-items01" style="width: 40px;">' + value.VALOR + '</div>';
                    vhtml+='<div class="mt-items02">';
                    Ext.Object.each(value.QTR, function(index01, value01){
                        Ext.Object.each(value01.MONTHS, function(index02, value02){
                            vhtml+='<div>';
                                vhtml+='<div style="width: 35px;"><b>' + value02.VALOR + '</b></div>';
                                vhtml+='<div>';
                                var data01, data02, data03, data04, data05, data06, data07, data08, data09, data10;
                                // console.log(ids);
                                Ext.Object.each(value02.WK, function(index03, value03){
                                    
                                    data01 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-WEEK' + '-' + value03.WEEK_COMM + '-' + value03.WEEK_CANT + '-' + value03.WEEK_ERROR + '-' + value03.WEEK_CANTSALE + '-' + value03.WEEK )
                                    
                                    data02 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-MONDAY' + '-' + value03.MONDAY_COMM + '-' + value03.MONDAY_CANT + '-' + value03.MONDAY_ERROR + '-' + value03.MONDAY_CANTSALE + '-' + value03.MONDAY )

                                    data03 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-TUESDAY' + '-' + value03.TUESDAY_COMM + '-' + value03.TUESDAY_CANT + '-' + value03.TUESDAY_ERROR + '-' + value03.TUESDAY_CANTSALE + '-' + value03.TUESDAY )

                                    data04 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-WEDNESDAY' + '-' + value03.WEDNESDAY_COMM + '-' + value03.WEDNESDAY_CANT + '-' + value03.WEDNESDAY_ERROR + '-' + value03.WEDNESDAY_CANTSALE + '-' + value03.WEDNESDAY )

                                    data05 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-THURSDAY' + '-' + value03.THURSDAY1_COMM + '-' + value03.THURSDAY1_CANT + '-' + value03.THURSDAY1_ERROR + '-' + value03.THURSDAY1_CANTSALE + '-' + value03.THURSDAY1 )

                                    data06 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-FRIDAY' + '-' + value03.FRIDAY_COMM + '-' + value03.FRIDAY_CANT + '-' + value03.FRIDAY_ERROR + '-' + value03.FRIDAY_CANTSALE + '-' + value03.FRIDAY )

                                    data07 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-SATURDAY' + '-' + value03.SATURDAY_COMM + '-' + value03.SATURDAY_CANT + '-' + value03.SATURDAY_ERROR + '-' + value03.SATURDAY_CANTSALE + '-' + value03.SATURDAY )

                                    data08 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.WEEK + '-SUNDAY' + '-' + value03.SUNDAY_COMM + '-' + value03.SUNDAY_CANT + '-' + value03.SUNDAY_ERROR + '-' + value03.SUNDAY_CANTSALE + '-' + value03.SUNDAY )

                                    vhtml+='<div>';
                                        vhtml+='<div style="width: 35px; border-left: 1px solid #6CB6E7;font-weight: normal;"><a name="link-item-calendar" id="' + 'link-' + ( data01 ) + '" href="#" style="' + me.getColor(value03.WEEK_COLOR) + '">' + value03.WEEK + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data02 ) + '" href="#" style="' + me.getColor(value03.MONDAY_COLOR) + '">' + value03.MONDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data03 ) + '" href="#" style="' + me.getColor(value03.TUESDAY_COLOR) + '">' + value03.TUESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data04 ) + '" href="#" style="' + me.getColor(value03.WEDNESDAY_COLOR) + '">' + value03.WEDNESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; margin-right: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data05 ) + '" href="#" style="' + me.getColor(value03.THURSDAY_COLOR) + '">' + value03.THURSDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; margin-left: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data06 ) + '" href="#" style="' + me.getColor(value03.FRIDAY_COLOR) + '">' + value03.FRIDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data07 ) + '" href="#" style="' + me.getColor(value03.SATURDAY_COLOR) + '">' + value03.SATURDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data08 ) + '" href="#" style="' + me.getColor(value03.SUNDAY_COLOR) + '">' + value03.SUNDAY + '</a></div>';
                                    vhtml+='</div>'; 

                                });
                                vhtml+='</div>';
                                    
                            vhtml+='</div>';
                        });
                    });
                    vhtml+='</div>';
                    vhtml+='</div>';
                });

            vhtml+='</div>';

            this.html = vhtml;

            this.listeners = {
                scope: this,
                afterrender: function(){
                    var me = this;
                    me.addEvtListener();
                }
            };
        } else if( me.fuente == 'BSP' ){
            vhtml+='<div class="mt-calendar" style="width: 1040px !important;">';
               vhtml+='<div class="mt-header" align="right">';
                    vhtml+='<div align="center">    ';
                        vhtml+='<span style="display: block !important; margin: 10px !important; font-size: 18px;">' + me.country + ' - BSP CALENDAR ' + me.year + ' - Airlines</span>';
                    vhtml+='</div>';
                    vhtml+='<div>';
                        vhtml+='<div style="width: 40px;">Qtr</div>';
                        vhtml+='<div style="width: 40px;">Month</div>';
                        vhtml+='<div style="width: 40px;">Period</div>';
                        vhtml+='<div style="width: 140px;">Reporting Period<br>From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To</div>';
                        vhtml+='<div class="mt-bg-day" style="height:40px;vertical-align:sub;">';
                            vhtml+='<div style="width: 65px;">Monday</div>';
                            vhtml+='<div style="width: 65px;">Tuesday</div>';
                            vhtml+='<div style="width: 65px;">Wednesday</div>';
                            vhtml+='<div style="width: 65px;">Thursday</div>';
                            vhtml+='<div style="width: 65px;">Friday</div>';
                            vhtml+='<div style="width: 65px;">Saturday</div>';
                            vhtml+='<div style="width: 65px;">Sunday</div>';
                        vhtml+='</div>';
                        vhtml+='<div style="width: 110px;height:60px;">Billing to Airlines<br>and Agents in<br>BSPLink</div>';
                        vhtml+='<div style="width: 90px;">Remittance<br>Date</div>';
                        vhtml+='<div style="width: 90px;">Settlement<br>Date</div>';
                    vhtml+='</div>';
                vhtml+='</div>';

                // console.log(me.items.length);

                Ext.Object.each(me.items, function(index, value){
                    vhtml+='<div class="mt-content" align="right">';
                    vhtml+='<div class="mt-items01" style="width: 40px;">' + value.VALOR + '</div>';
                    vhtml+='<div class="mt-items02">';
                    Ext.Object.each(value.QTR, function(index01, value01){
                        Ext.Object.each(value01.MONTHS, function(index02, value02){
                            vhtml+='<div>';
                                vhtml+='<div style="width: 40px;"><b>' + value02.VALOR + '</b></div>';
                                vhtml+='<div>';
                                var data01, data01_1, data01_2, data02, data03, data04, data05, data06, data07, data08, data09, data10;
                                // console.log(ids);
                                Ext.Object.each(value02.PD, function(index03, value03){
                                    
//                                    data01 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-PERIOD' + '-' + value03.PERIOD_COMM + '-' + value03.PERIOD_CANT + '-' + value03.PERIOD_ERROR + '-' + value03.PERIOD_CANTSALE + '-' + value03.PERIOD )
                                    
                                    data02 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-MONDAY' + '-' + value03.MONDAY_COMM + '-' + value03.MONDAY_CANT + '-' + value03.MONDAY_ERROR + '-' + value03.MONDAY_CANTSALE + '-' + value03.MONDAY )

                                    data03 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-TUESDAY' + '-' + value03.TUESDAY_COMM + '-' + value03.TUESDAY_CANT + '-' + value03.TUESDAY_ERROR + '-' + value03.TUESDAY_CANTSALE + '-' + value03.TUESDAY )

                                    data04 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-WEDNESDAY' + '-' + value03.WEDNESDAY_COMM + '-' + value03.WEDNESDAY_CANT + '-' + value03.WEDNESDAY_ERROR + '-' + value03.WEDNESDAY_CANTSALE + '-' + value03.WEDNESDAY )

                                    data05 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-THURSDAY' + '-' + value03.THURSDAY1_COMM + '-' + value03.THURSDAY1_CANT + '-' + value03.THURSDAY1_ERROR + '-' + value03.THURSDAY1_CANTSALE + '-' + value03.THURSDAY1 )

                                    data06 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-FRIDAY' + '-' + value03.FRIDAY_COMM + '-' + value03.FRIDAY_CANT + '-' + value03.FRIDAY_ERROR + '-' + value03.FRIDAY_CANTSALE + '-' + value03.FRIDAY )

                                    data07 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-SATURDAY' + '-' + value03.SATURDAY_COMM + '-' + value03.SATURDAY_CANT + '-' + value03.SATURDAY_ERROR + '-' + value03.SATURDAY_CANTSALE + '-' + value03.SATURDAY )

                                    data08 = ( value.VALOR + '-' + value02.VALOR + '-' + value03.PERIOD + '-SUNDAY' + '-' + value03.SUNDAY_COMM + '-' + value03.SUNDAY_CANT + '-' + value03.SUNDAY_ERROR + '-' + value03.SUNDAY_CANTSALE + '-' + value03.SUNDAY )

                                    vhtml+='<div>';
                                        vhtml+='<div style="width: 40px; border-left: 3px solid #6CB6E7; font-weight: normal;">' + Number(value03.PERIOD) + '</div>';
                                        vhtml+='<div style="width: 70px; font-weight: normal;">' + value03.FROM + '</div>';
                                        vhtml+='<div style="width: 70px; font-weight: normal;">' + value03.TO + '</div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data02 ) + '" href="#" style="' + me.getColor(value03.MONDAY_COLOR) + '">' + value03.MONDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data03 ) + '" href="#" style="' + me.getColor(value03.TUESDAY_COLOR) + '">' + value03.TUESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data04 ) + '" href="#" style="' + me.getColor(value03.WEDNESDAY_COLOR) + '">' + value03.WEDNESDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; margin-right: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data05 ) + '" href="#" style="' + me.getColor(value03.THURSDAY_COLOR) + '">' + value03.THURSDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; margin-left: 0px !important;"><a name="link-item-calendar" id="' + 'link-' + ( data06 ) + '" href="#" style="' + me.getColor(value03.FRIDAY_COLOR) + '">' + value03.FRIDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data07 ) + '" href="#" style="' + me.getColor(value03.SATURDAY_COLOR) + '">' + value03.SATURDAY + '</a></div>';
                                        vhtml+='<div style="width: 65px; color: #339900;"><a name="link-item-calendar" id="' + 'link-' + ( data08 ) + '" href="#" style="' + me.getColor(value03.SUNDAY_COLOR) + '">' + value03.SUNDAY + '</a></div>';
                                        vhtml+='<div style="width: 110px; border-left: 3px solid #6CB6E7; font-weight: normal;">' + value03.A1529BAIR + "&nbsp;" + '</div>';
                                        vhtml+='<div style="width: 90px; font-weight: normal;">' + value03.A1529REMW + '</div>';
                                        vhtml+='<div style="width: 90px; font-weight: normal;">' + value03.A1529SETW + '</div>';
                                    vhtml+='</div>'; 

                                });
                                vhtml+='</div>';
                                    
                            vhtml+='</div>';
                        });
                    });
                    vhtml+='</div>';
                    vhtml+='</div>';
                });

            vhtml+='</div>';

            this.html = vhtml;

            this.listeners = {
                scope: this,
                afterrender: function(){
                    var me = this;
                    me.addEvtListener();
                }
            };
        } 

        this.callParent();
    },

    getColor: function(color){
        color = Ext.String.trim(color);
        return 'color: ' + ( color == undefined || color == '' ? 'black' : color );
    },

    onItemCalendarClick: function(me, target,p){
        // var spec = {
        //     tag: 'data-qtip',
        //     html: 'This tip is inline'
        // };
        // console.log(Ext.DomHelper.append(target, spec));
        // target.setAttribute("data-qtip", "This tip is inline");
        if( this.fuente == 'ARC' ){
            this.fireEvent('onItemCalendarClick', p.qtr, p.month, p.week, p.op, p.commelw, p.commiap, p.commiar, p.cant, p.error, p.cantsale, p.cantelw, p.cantiap, p.cantiar, p.text);
        }else if( this.fuente == 'ASR' ){
            this.fireEvent('onItemCalendarClick', p.qtr, p.month, p.week, p.op, p.comm, p.cant, p.error, p.cantsale, p.text);
        }
    },

    addEvtListener: function(){
        var me = this;
        var links = Ext.dom.Element.query('a[name=link-item-calendar]');
        var qtr, month, week, op, cant, error, cantsale, text;
        Ext.Object.each(links, function(index, value){
            //console.log(value);
            qtr = value.id.split('-')[1];
            month = value.id.split('-')[2];
            week = value.id.split('-')[3];
            op = value.id.split('-')[4];
            
            //------------------------------
            if( me.fuente == 'ARC' ){
                var commelw, commiap, commiar, cantelw, cantiap, cantiar;
                commelw = value.id.split('-')[5];
                commiap = value.id.split('-')[6];
                commiar = value.id.split('-')[7];
                cant = value.id.split('-')[8];
                error = value.id.split('-')[9];
                cantsale = value.id.split('-')[10];
                cantelw = value.id.split('-')[11];
                cantiap = value.id.split('-')[12];
                cantiar = value.id.split('-')[13];
                text = value.id.split('-')[14];
                Ext.get(value).on('click', me.onItemCalendarClick, me, {qtr: qtr, month: month, week: week, op: op, commelw: commelw, commiap: commiap, commiar: commiar, cant: cant, error: error, cantsale: cantsale, cantelw: cantelw, cantiap: cantiap, cantiar: cantiar, text: text});
            }else if( me.fuente == 'ASR' ){
                var comm;
                comm = value.id.split('-')[5];
                cant = value.id.split('-')[6];
                error = value.id.split('-')[7];
                cantsale = value.id.split('-')[8];
                text = value.id.split('-')[9];
                Ext.get(value).on('click', me.onItemCalendarClick, me, {qtr: qtr, month: month, week: week, op: op, comm: comm, cant: cant, error: error, cantsale: cantsale, text: text});
            }
        });
    }

});