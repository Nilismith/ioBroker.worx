const objects = require(`./objects`);
module.exports = {
    async createDevices(mower) {
        await this.setObjectNotExistsAsync(mower.serial_number, {
            type: "device",
            common: {
                name: mower.name,
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.areas`, {
            type: "channel",
            common: {
                name: "mower areas",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.calendar`, {
            type: "channel",
            common: {
                name: "mower calendar",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower`, {
            type: "channel",
            common: {
                name: "mower control",
            },
            native: {},
        });

        for (let a = 0; a <= 3; a++) {
            await this.setObjectNotExistsAsync(`${mower.serial_number}.areas.area_${a}`, {
                type: "state",
                common: {
                    name: `Area${a}`,
                    type: "number",
                    role: "value",
                    unit: "m",
                    read: true,
                    write: true,
                    desc: `Distance from Start point for area ${a}`,
                },
                native: {},
            });
        }

        await this.setObjectNotExistsAsync(`${mower.serial_number}.areas.actualArea`, {
            type: "state",
            common: {
                name: "Actual area",
                type: "number",
                role: "value",
                read: true,
                write: false,
                desc: "Show the current area",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.areas.actualAreaIndicator`, {
            type: "state",
            common: {
                name: "Actual area",
                type: "number",
                role: "value",
                read: true,
                write: false,
                desc: "Show the current area",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.areas.startSequence`, {
            type: "state",
            common: {
                name: "Start sequence",
                type: "object",
                role: "value",
                read: true,
                write: true,
                desc: "Sequence of area to start from",
            },
            native: {},
        });

        //calendar
        for (const day of this.week) {
            for (const o of objects.calendar) {
                // @ts-ignore
                await this.setObjectNotExistsAsync(`${mower.serial_number}.calendar.${day}.${o._id}`, o);
            }
        }
        // mower
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.online`, {
            type: "state",
            common: {
                name: "Online",
                type: "boolean",
                role: "indicator.connected",
                read: true,
                write: false,
                desc: "If mower connected to cloud",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.firmware`, {
            type: "state",
            common: {
                name: "Firmware Version",
                type: "string",
                role: "meta.version",
                read: true,
                write: false,
                desc: "Firmware Version",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.wifiQuality`, {
            type: "state",
            common: {
                name: "Wifi quality",
                type: "number",
                role: "value",
                read: true,
                write: false,
                unit: "dBm",
                desc: "Prozent of Wifi quality",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.batteryChargeCycle`, {
            type: "state",
            common: {
                name: "Battery charge cycle",
                type: "number",
                role: "indicator",
                read: true,
                write: false,
                desc: "Show the number of charging cycles",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.batteryCharging`, {
            type: "state",
            common: {
                name: "Battery charger state",
                type: "boolean",
                role: "indicator",
                read: true,
                write: false,
                desc: "Battery charger state",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.batteryState`, {
            type: "state",
            common: {
                name: "Landroid battery state",
                type: "number",
                role: "value.battery",
                read: true,
                write: false,
                unit: "%",
                desc: "Landroid mower battery state in %",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.batteryTemperature`, {
            type: "state",
            common: {
                name: "Battery temperature",
                type: "number",
                role: "value.temperature",
                read: true,
                write: false,
                unit: "°C",
                desc: "Temperature of movers battery",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.batteryVoltage`, {
            type: "state",
            common: {
                name: "Battery voltage",
                type: "number",
                role: "value.voltage",
                read: true,
                write: false,
                unit: "V",
                desc: "Voltage of movers battery",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.error`, {
            type: "state",
            common: {
                name: "Error code",
                type: "number",
                role: "value.error",
                read: true,
                write: false,
                desc: "Error code",
                states: {
                    0: "No error",
                    1: "Trapped",
                    2: "Lifted",
                    3: "Wire missing",
                    4: "Outside wire",
                    5: "Raining",
                    6: "Close door to mow",
                    7: "Close door to go home",
                    8: "Blade motor blocked",
                    9: "Wheel motor blocked",
                    10: "Trapped timeout",
                    11: "Upside down",
                    12: "Battery low",
                    13: "Reverse wire",
                    14: "Charge error",
                    15: "Timeout finding home",
                    16: "Mower locked",
                    17: "Battery over temperature",
                    18: "dummy model",
                    19: "Battery trunk open timeout",
                    20: "wire sync",
                    21: "msg num",
                },
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.pause`, {
            type: "state",
            common: {
                name: "Pause",
                type: "boolean",
                role: "button.stop",
                read: true,
                write: true,
                desc: "Pause the mover",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.edgecut`, {
            type: "state",
            common: {
                name: "Edge cut",
                type: "boolean",
                role: "button.edgecut",
                read: true,
                write: true,
                desc: "start edge cutting",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.state`, {
            type: "state",
            common: {
                name: "Start/Stop",
                type: "boolean",
                role: "switch",
                read: true,
                write: true,
                desc: "Start and stop the mover",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.status`, {
            type: "state",
            common: {
                name: "Landroid status",
                type: "number",
                role: "indicator.status",
                read: true,
                write: false,
                desc: "Current status of lawn mower",
                states: {
                    0: "IDLE",
                    1: "Home",
                    2: "Start sequence",
                    3: "Leaving home",
                    4: "Follow wire",
                    5: "Searching home",
                    6: "Searching wire",
                    7: "Mowing",
                    8: "Lifted",
                    9: "Trapped",
                    10: "Blade blocked",
                    11: "Debug",
                    12: "Remote control",
                    13: "escape from off limits",
                    30: "Going home",
                    31: "Zone training",
                    32: "Border Cut",
                    33: "Searching zone",
                    34: "Pause",
                },
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.totalBladeTime`, {
            type: "state",
            common: {
                name: "Runtime of the blades",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "h",
                desc: "Total blade is running",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.totalDistance`, {
            type: "state",
            common: {
                name: "Total mower distance",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "km",
                desc: "Total distance the mower has been mowing in km",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.totalTime`, {
            type: "state",
            common: {
                name: "Total mower time",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "h",
                desc: "Total distance the mower has been mowing in hours",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.waitRain`, {
            type: "state",
            common: {
                name: "Wait after rain",
                type: "number",
                role: "value.interval",
                read: true,
                write: true,
                unit: "min",
                desc: "Time to wait after rain, in minutes",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.mowTimeExtend`, {
            type: "state",
            common: {
                name: "Mowing times exceed",
                type: "number",
                role: "value",
                read: true,
                write: true,
                unit: "%",
                desc: "Extend the mowing time",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.mowerActive`, {
            type: "state",
            common: {
                name: "Time-controlled mowing",
                type: "boolean",
                role: "switch",
                read: true,
                write: true,
                desc: "Time-controlled mowing",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.sendCommand`, {
            type: "state",
            common: {
                name: "send Command",
                type: "number",
                role: "value",
                read: true,
                write: true,
                desc: "send Command to Landroid",
                states: {
                    1: "Start",
                    2: "Stop",
                    3: "Home",
                    4: "Start Zone Taining",
                    5: "Lock",
                    6: "Unlock",
                    7: "Restart Robot",
                    8: "pause when follow wire",
                    9: "safe homing",
                },
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.gradient`, {
            type: "state",
            common: {
                name: "Gradient",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "°",
                desc: "Gradient from the mower",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.inclination`, {
            type: "state",
            common: {
                name: "Inclination",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "°",
                desc: "Inclination from the mower",
            },
            native: {},
        });
        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.direction`, {
            type: "state",
            common: {
                name: "Direction",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "°",
                desc: "Direction from the mower",
            },
            native: {},
        });

        await this.extendObjectAsync(`${mower.serial_number}.mower.totalTime`, {
            common: {
                unit: this.config.meterMin ? "min." : "h",
            },
        });
        await this.extendObjectAsync(`${mower.serial_number}.mower.totalDistance`, {
            common: {
                unit: this.config.meterMin ? "m" : "Km",
            },
        });
        await this.extendObjectAsync(`${mower.serial_number}.mower.totalBladeTime`, {
            common: {
                unit: this.config.meterMin ? "min." : "h",
            },
        });
    },
    async setStates(mower) {
        if (mower) {
            await this.setStateAsync(`${mower.serial_number}.mower.online`, mower.online, true);
        }
        if (!mower || !mower.last_status || !mower.last_status.payload) {
            this.log.info("No payload found");
            return;
        }

        const data = mower.last_status.payload;
        //mower set states
        const sequence = [];
        //data = testmsg
        this.log.debug(`GET MQTT DATA from API: ${JSON.stringify(data)}`);

        //catch error if onj is empty
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.log.debug("GET Empty MQTT DATA from API");
            return;
        }

        // catch if JSON contain other data e.g. {"ota":"ota fail","mac":"XXXXXXXXXXXX"}"
        if (typeof data.dat === "undefined" || typeof data.cfg === "undefined") {
            this.log.info(`No data Message: ${JSON.stringify(data)}`);
            return;
        }
        try {
            if (this.config.meterMin) {
                this.setStateAsync(`${mower.serial_number}.mower.totalTime`, {
                    val: data.dat.st && data.dat.st.wt ? parseFloat(data.dat.st.wt.toFixed(2)) : null,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.totalDistance`, {
                    val: data.dat.st && data.dat.st.d ? parseFloat(data.dat.st.d.toFixed(2)) : null,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.totalBladeTime`, {
                    val: data.dat.st && data.dat.st.b ? parseFloat(data.dat.st.b.toFixed(2)) : null,
                    ack: true,
                });
            } else {
                this.setStateAsync(`${mower.serial_number}.mower.totalTime`, {
                    val: data.dat.st && data.dat.st.wt ? parseFloat((data.dat.st.wt / 6 / 10).toFixed(2)) : null,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.totalDistance`, {
                    val: data.dat.st && data.dat.st.d ? parseFloat((data.dat.st.d / 100 / 10).toFixed(2)) : null,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.totalBladeTime`, {
                    val: data.dat.st && data.dat.st.b ? parseFloat((data.dat.st.b / 6 / 10).toFixed(2)) : null,
                    ack: true,
                });
            }
            this.setStateAsync(`${mower.serial_number}.mower.gradient`, {
                val: data.dat.dmp && data.dat.dmp[0] ? data.dat.dmp[0] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.inclination`, {
                val: data.dat.dmp && data.dat.dmp[1] ? data.dat.dmp[1] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.direction`, {
                val: data.dat.dmp && data.dat.dmp[2] ? data.dat.dmp[2] : 0,
                ack: true,
            });

            this.setStateAsync(`${mower.serial_number}.mower.batteryChargeCycle`, {
                val: data.dat.bt && data.dat.bt.nr ? data.dat.bt.nr : null,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.batteryCharging`, {
                val: data.dat.bt && data.dat.bt.c ? true : false,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.batteryVoltage`, {
                val: data.dat.bt && data.dat.bt.v ? data.dat.bt.v : null,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.batteryTemperature`, {
                val: data.dat.bt && data.dat.bt.t ? data.dat.bt.t : null,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.error`, {
                val: data.dat && data.dat.le ? data.dat.le : 0,
                ack: true,
            });
            this.log.debug(`Test Status: ${data.dat && data.dat.ls ? data.dat.ls : 0}`);
            this.setStateAsync(`${mower.serial_number}.mower.status`, {
                val: data.dat && data.dat.ls ? data.dat.ls : 0,
                ack: true,
            });

            this.setStateAsync(`${mower.serial_number}.mower.wifiQuality`, {
                val: data.dat && data.dat.rsi ? data.dat.rsi : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.mowerActive`, {
                val: data.cfg.sc && data.cfg.sc.m ? true : false,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.mowTimeExtend`, {
                val: data.cfg.sc && data.cfg.sc.p ? data.cfg.sc.p : 0,
                ack: true,
            });

            // sort Areas
            this.setStateAsync(`${mower.serial_number}.areas.area_0`, {
                val: data.cfg.mz && data.cfg.mz[0] ? data.cfg.mz[0] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.areas.area_1`, {
                val: data.cfg.mz && data.cfg.mz[1] ? data.cfg.mz[1] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.areas.area_2`, {
                val: data.cfg.mz && data.cfg.mz[2] ? data.cfg.mz[2] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.areas.area_3`, {
                val: data.cfg.mz && data.cfg.mz[3] ? data.cfg.mz[3] : 0,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.areas.actualArea`, {
                val: data.dat && data.cfg && data.cfg.mzv ? data.cfg.mzv[data.dat.lz] : null,
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.areas.actualAreaIndicator`, {
                val: data.dat && data.dat.lz ? data.dat.lz : null,
                ack: true,
            });

            this.setStateAsync(`${mower.serial_number}.mower.firmware`, {
                val: data.dat && data.dat.fw ? data.dat.fw.toString() : "-",
                ack: true,
            });
            this.setStateAsync(`${mower.serial_number}.mower.waitRain`, {
                val: data.cfg.rd,
                ack: true,
            });
            data.dat.bt &&
                this.setStateAsync(`${mower.serial_number}.mower.batteryState`, {
                    val: data.dat.bt.p,
                    ack: true,
                });

            if (data.cfg.mzv) {
                for (let i = 0; i < data.cfg.mzv.length; i++) {
                    //  adapter.setState("areas.startSequence", { val: data.cfg.mzv[i], ack: true });
                    sequence.push(data.cfg.mzv[i]);
                }
                this.setStateAsync(`${mower.serial_number}.areas.startSequence`, {
                    val: JSON.stringify(sequence),
                    ack: true,
                });
            }

            const state = data.dat && data.dat.ls ? data.dat.ls : 0;
            const error = data.dat && data.dat.le ? data.dat.le : 0;

            if ((state === 7 || state === 9) && error === 0) {
                this.setStateAsync(`${mower.serial_number}.mower.state`, {
                    val: true,
                    ack: true,
                });
            } else {
                this.setStateAsync(`${mower.serial_number}.mower.state`, {
                    val: false,
                    ack: true,
                });
            }
            if (data.cfg.sc && data.cfg.sc.d) {
                this.evaluateCalendar(mower, data.cfg.sc.d, false);
            }
            // Second Mowtime
            if (data.cfg.sc && data.cfg.sc.dd) {
                this.evaluateCalendar(mower, data.cfg.sc.dd, true);
            }

            // 1TimeShedule
            if (data.cfg.sc && data.cfg.sc.ots) {
                this.setStateAsync(`${mower.serial_number}.mower.oneTimeWithBorder`, {
                    val: data.cfg.sc.ots.bc ? true : false,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.oneTimeWorkTime`, {
                    val: data.cfg.sc.ots.wtm,
                    ack: true,
                });
                this.setStateAsync(`${mower.serial_number}.mower.oneTimeJson`, {
                    val: JSON.stringify(data.cfg.sc.ots),
                    ack: true,
                });
            }

            // PartyModus
            if (data.cfg.sc && typeof data.cfg.sc.distm !== "undefined" && typeof data.cfg.sc.m !== "undefined") {
                this.setStateAsync(`${mower.serial_number}.mower.partyModus`, {
                    val: data.cfg.sc.m === 2 ? true : false,
                    ack: true,
                });
            }

            //JSON week
            if (data.cfg.sc && data.cfg.sc.d) {
                await this.setStateAsync(`${mower.serial_number}.calendar.calJson`, {
                    val: JSON.stringify(data.cfg.sc.d),
                    ack: true,
                });
            }
            if (data.cfg.sc && data.cfg.sc.dd) {
                await this.setStateAsync(`${mower.serial_number}.calendar.calJson2`, {
                    val: JSON.stringify(data.cfg.sc.dd),
                    ack: true,
                });
            }

            // edgecutting
            if (mower.edgeCut && (state === 1 || state === 3)) {
                this.log.debug(`Edgecut Start section :${state}`);
            } else if (state === 31 && mower.edgeCut) {
                setTimeout(() => {
                    this.log.debug("Edgecut send cmd:2");
                    this.sendMessage('{"cmd":2}', mower.serial_number);
                }, this.config.edgeCutDelay);
            } else if (state === 34 && mower.edgeCut) {
                this.log.debug("Edgecut send cmd:3");
                this.sendMessage('{"cmd":3}', mower.serial_number);
                mower.edgeCut = false;
            } else if (mower.edgeCut === true && state !== 31 && state !== 34) {
                mower.edgeCut = false;
                this.log.warn("Something went wrong at edgeCut");
            }

            //
            //torque control found
            if (data && data.cfg && typeof data.cfg.tq !== "undefined") {
                if (typeof this.modules["tq"] === "undefined") {
                    this.log.info("found torque control, create states...");
                    for (const o of objects.module_tq) {
                        // @ts-ignore
                        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.${o._id}`, o);
                    }
                }
                this.modules["tq"] = data.cfg.tq;
                this.setStateAsync(`${mower.serial_number}.mower.torque`, {
                    val: parseInt(data.cfg.tq),
                    ack: true,
                });
            }

            //modules
            if (data.cfg.modules && !this.modules.channel) {
                await this.setObjectNotExistsAsync(`${mower.serial_number}.modules`, {
                    type: "channel",
                    common: {
                        name: "mower this.modules",
                    },
                    native: {},
                });
                this.modules.channel = true;
            }

            //4G Module
            if (data.cfg.modules && data.cfg.modules["4G"] && data.cfg.modules["4G"]["geo"]) {
                if (!this.modules["4G"]) {
                    for (const o of objects.module_4g) {
                        // @ts-ignore
                        await this.setObjectNotExistsAsync(`${mower.serial_number}.modules.4G.${o._id}`, o);
                        this.log.info(`GSP Module found! Create State : ${o._id}`);
                    }
                }
                this.modules["4G"] = data.cfg.modules["4G"];
                await this.setStateAsync(`${mower.serial_number}.modules.4G.longitude`, {
                    val: data.cfg.modules["4G"]["geo"]["coo"][1],
                    ack: true,
                });
                await this.setStateAsync(`${mower.serial_number}.modules.4G.latitude`, {
                    val: data.cfg.modules["4G"]["geo"]["coo"][0],
                    ack: true,
                });
            }
            //US Module
            if (data.cfg.modules && data.cfg.modules["US"]) {
                if (!this.modules["US"]) {
                    for (const o of objects.US) {
                        // @ts-ignore
                        await this.setObjectNotExistsAsync(mower.serial_number + ".modules.US." + o._id, o);
                        this.log.info("ACS Module found! Create State : " + o._id);
                    }
                }
                this.modules["US"] = data.cfg.modules["US"];
                await this.setStateAsync(mower.serial_number + ".modules.US.ACS", {
                    val: data.cfg.modules["US"]["enabled"],
                    ack: true,
                });
                await this.setStateAsync(mower.serial_number + ".modules.US.ACS_Status", {
                    val: data.dat.modules["US"]["stat"],
                    ack: true,
                });
            }
            // Df Module
            if (data.cfg.modules && data.cfg.modules.DF) {
                if (!this.modules.DF) {
                    for (const o of objects.module_df) {
                        // @ts-ignore
                        await this.setObjectNotExistsAsync(`${mower.serial_number}.modules.DF.${o._id}`, o);
                        this.log.info(`OffLimits Module found! Create State : ${o._id}`);
                    }
                }

                this.modules.DF = data.cfg.modules.DF;
                await this.setStateAsync(`${mower.serial_number}.modules.DF.OLMSwitch_Cutting`, {
                    val: data.cfg.modules && data.cfg.modules.DF ? !!data.cfg.modules.DF.cut : false,
                    ack: true,
                });
                await this.setStateAsync(`${mower.serial_number}.modules.DF.OLMSwitch_FastHoming`, {
                    val: data.cfg.modules && data.cfg.modules.DF ? !!data.cfg.modules.DF.fh : false,
                    ack: true,
                });
            }
            //Autolock feture
            if (data.cfg && data.cfg.al) {
                if (!this.modules.al) {
                    for (const o of objects.al) {
                        // @ts-ignore
                        await this.setObjectNotExistsAsync(`${mower.serial_number}.mower.${o._id}`, o);
                        this.log.info(`Autolock found! Create State : ${o._id}`);
                    }
                }
                this.modules.al = data.cfg.al;
                // save last positive Value
                if (data.cfg.al.t > 0) this.modules.al_last = data.cfg.al.t;

                await this.setStateAsync(`${mower.serial_number}.mower.AutoLock`, {
                    val: !!data.cfg.al.lvl,
                    ack: true,
                });
                await this.setStateAsync(`${mower.serial_number}.mower.AutoLockTimer`, {
                    val: data.cfg.al.t,
                    ack: true,
                });
            }
        } catch (error) {
            if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
                const sentryInstance = this.getPluginInstance("sentry");
                if (sentryInstance) {
                    sentryInstance.getSentryObject().captureException(error, {
                        extra: {
                            "data:": JSON.stringify(data),
                        },
                    });
                }
            }
        }
    },
};