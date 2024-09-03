package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class ChannelInfo {
	public String channelId;
	public String channelType;
	public int totalDuration;
	public String agentPhoneNumber;
	public String currentState;
	public int ringingDuration;
	public int ringingCount;
	public int outdialRingingCount;
	public int outdialRingingDuration;
	public int idleCount;
	public int idleDuration;
	public int availableCount;
	public int availableDuration;
	public int connectedCount;
	public int connectedDuration;
	public int outdialConnectedCount;
	public int outdialConnectedDuration;
	public int conferenceCount;
	public int conferenceDuration;
	public int outdialConferenceCount;
	public int outdialConferenceDuration;
	public int consultAnswerCount;
	public int consultAnswerDuration;
	public int outdialConsultAnswerCount;
	public int outdialConsultAnswerDuration;
	public int consultRequestCount;
	public int consultRequestDuration;
	public int outdialConsultRequestCount;
	public int outdialConsultRequestDuration;
	public int consultCount;
	public int consultDuration;
	public int outdialConsultCount;
	public int outdialConsultDuration;
	public int consultToQueueAnswerCount;
	public int consultToQueueAnswerDuration;
	public int outdialConsultToQueueAnswerCount;
	public int outdialConsultToQueueAnswerDuration;
	public int consultToQueueRequestCount;
	public int consultToQueueRequestDuration;
	public int outdialConsultToQueueRequestCount;
	public int outdialConsultToQueueRequestDuration;
	public int consultToQueueCount;
	public int consultToQueueDuration;
	public int holdCount;
	public int holdDuration;
	public int outdialHoldCount;
	public int outdialHoldDuration;
	public int notRespondedCount;
	public int notRespondedDuration;
	public int outdialNotRespondedCount;
	public int outdialNotRespondedDuration;
	public int wrapupCount;
	public int wrapupDuration;
	public int outdialWrapupCount;
	public int outdialWrapupDuration;
	public int disconnectedCount;
	public int agentToAgentTransferCount;
	public int outdialAgentToAgentTransferCount;
	public int outdialAgentTransferToQueueRequestCount;
	public int agentTransferToQueueRequestCount;
	public int blindTransferCount;
	public int outdialBlindTransferCount;
	public int outdialCount;
	public int outdialTransferCount;
	public int disconnectedHoldCallsCount;
	public int transferCount;
//    public Object subChannelType;
	public int outdialConsultTransferDuration;
	public int callBackCount;
	public Object lastActivityTime;
//    public String idleCodeName;
	public int consultToEpRequestedCount;
	public int consultToEpRequestedDuration;
	public int consultToEpAnsweredCount;
	public int consultToEpAnsweredDuration;
	public int outdialConsultToEpRequestedCount;
	public int outdialConsultToEpRequestedDuration;
	public int outdialConsultToEpAnsweredCount;
	public int outdialConsultToEpAnsweredDuration;
	public int totalReservationTime;
	public int reservationCount;

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getChannelType() {
		return channelType;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

	public int getTotalDuration() {
		return totalDuration;
	}

	public void setTotalDuration(int totalDuration) {
		this.totalDuration = totalDuration;
	}

	public String getAgentPhoneNumber() {
		return agentPhoneNumber;
	}

	public void setAgentPhoneNumber(String agentPhoneNumber) {
		this.agentPhoneNumber = agentPhoneNumber;
	}

	public String getCurrentState() {
		return currentState;
	}

	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

	public int getRingingDuration() {
		return ringingDuration;
	}

	public void setRingingDuration(int ringingDuration) {
		this.ringingDuration = ringingDuration;
	}

	public int getRingingCount() {
		return ringingCount;
	}

	public void setRingingCount(int ringingCount) {
		this.ringingCount = ringingCount;
	}

	public int getOutdialRingingCount() {
		return outdialRingingCount;
	}

	public void setOutdialRingingCount(int outdialRingingCount) {
		this.outdialRingingCount = outdialRingingCount;
	}

	public int getOutdialRingingDuration() {
		return outdialRingingDuration;
	}

	public void setOutdialRingingDuration(int outdialRingingDuration) {
		this.outdialRingingDuration = outdialRingingDuration;
	}

	public int getIdleCount() {
		return idleCount;
	}

	public void setIdleCount(int idleCount) {
		this.idleCount = idleCount;
	}

	public int getIdleDuration() {
		return idleDuration;
	}

	public void setIdleDuration(int idleDuration) {
		this.idleDuration = idleDuration;
	}

	public int getAvailableCount() {
		return availableCount;
	}

	public void setAvailableCount(int availableCount) {
		this.availableCount = availableCount;
	}

	public int getAvailableDuration() {
		return availableDuration;
	}

	public void setAvailableDuration(int availableDuration) {
		this.availableDuration = availableDuration;
	}

	public int getConnectedCount() {
		return connectedCount;
	}

	public void setConnectedCount(int connectedCount) {
		this.connectedCount = connectedCount;
	}

	public int getConnectedDuration() {
		return connectedDuration;
	}

	public void setConnectedDuration(int connectedDuration) {
		this.connectedDuration = connectedDuration;
	}

	public int getOutdialConnectedCount() {
		return outdialConnectedCount;
	}

	public void setOutdialConnectedCount(int outdialConnectedCount) {
		this.outdialConnectedCount = outdialConnectedCount;
	}

	public int getOutdialConnectedDuration() {
		return outdialConnectedDuration;
	}

	public void setOutdialConnectedDuration(int outdialConnectedDuration) {
		this.outdialConnectedDuration = outdialConnectedDuration;
	}

	public int getConferenceCount() {
		return conferenceCount;
	}

	public void setConferenceCount(int conferenceCount) {
		this.conferenceCount = conferenceCount;
	}

	public int getConferenceDuration() {
		return conferenceDuration;
	}

	public void setConferenceDuration(int conferenceDuration) {
		this.conferenceDuration = conferenceDuration;
	}

	public int getOutdialConferenceCount() {
		return outdialConferenceCount;
	}

	public void setOutdialConferenceCount(int outdialConferenceCount) {
		this.outdialConferenceCount = outdialConferenceCount;
	}

	public int getOutdialConferenceDuration() {
		return outdialConferenceDuration;
	}

	public void setOutdialConferenceDuration(int outdialConferenceDuration) {
		this.outdialConferenceDuration = outdialConferenceDuration;
	}

	public int getConsultAnswerCount() {
		return consultAnswerCount;
	}

	public void setConsultAnswerCount(int consultAnswerCount) {
		this.consultAnswerCount = consultAnswerCount;
	}

	public int getConsultAnswerDuration() {
		return consultAnswerDuration;
	}

	public void setConsultAnswerDuration(int consultAnswerDuration) {
		this.consultAnswerDuration = consultAnswerDuration;
	}

	public int getOutdialConsultAnswerCount() {
		return outdialConsultAnswerCount;
	}

	public void setOutdialConsultAnswerCount(int outdialConsultAnswerCount) {
		this.outdialConsultAnswerCount = outdialConsultAnswerCount;
	}

	public int getOutdialConsultAnswerDuration() {
		return outdialConsultAnswerDuration;
	}

	public void setOutdialConsultAnswerDuration(int outdialConsultAnswerDuration) {
		this.outdialConsultAnswerDuration = outdialConsultAnswerDuration;
	}

	public int getConsultRequestCount() {
		return consultRequestCount;
	}

	public void setConsultRequestCount(int consultRequestCount) {
		this.consultRequestCount = consultRequestCount;
	}

	public int getConsultRequestDuration() {
		return consultRequestDuration;
	}

	public void setConsultRequestDuration(int consultRequestDuration) {
		this.consultRequestDuration = consultRequestDuration;
	}

	public int getOutdialConsultRequestCount() {
		return outdialConsultRequestCount;
	}

	public void setOutdialConsultRequestCount(int outdialConsultRequestCount) {
		this.outdialConsultRequestCount = outdialConsultRequestCount;
	}

	public int getOutdialConsultRequestDuration() {
		return outdialConsultRequestDuration;
	}

	public void setOutdialConsultRequestDuration(int outdialConsultRequestDuration) {
		this.outdialConsultRequestDuration = outdialConsultRequestDuration;
	}

	public int getConsultCount() {
		return consultCount;
	}

	public void setConsultCount(int consultCount) {
		this.consultCount = consultCount;
	}

	public int getConsultDuration() {
		return consultDuration;
	}

	public void setConsultDuration(int consultDuration) {
		this.consultDuration = consultDuration;
	}

	public int getOutdialConsultCount() {
		return outdialConsultCount;
	}

	public void setOutdialConsultCount(int outdialConsultCount) {
		this.outdialConsultCount = outdialConsultCount;
	}

	public int getOutdialConsultDuration() {
		return outdialConsultDuration;
	}

	public void setOutdialConsultDuration(int outdialConsultDuration) {
		this.outdialConsultDuration = outdialConsultDuration;
	}

	public int getConsultToQueueAnswerCount() {
		return consultToQueueAnswerCount;
	}

	public void setConsultToQueueAnswerCount(int consultToQueueAnswerCount) {
		this.consultToQueueAnswerCount = consultToQueueAnswerCount;
	}

	public int getConsultToQueueAnswerDuration() {
		return consultToQueueAnswerDuration;
	}

	public void setConsultToQueueAnswerDuration(int consultToQueueAnswerDuration) {
		this.consultToQueueAnswerDuration = consultToQueueAnswerDuration;
	}

	public int getOutdialConsultToQueueAnswerCount() {
		return outdialConsultToQueueAnswerCount;
	}

	public void setOutdialConsultToQueueAnswerCount(int outdialConsultToQueueAnswerCount) {
		this.outdialConsultToQueueAnswerCount = outdialConsultToQueueAnswerCount;
	}

	public int getOutdialConsultToQueueAnswerDuration() {
		return outdialConsultToQueueAnswerDuration;
	}

	public void setOutdialConsultToQueueAnswerDuration(int outdialConsultToQueueAnswerDuration) {
		this.outdialConsultToQueueAnswerDuration = outdialConsultToQueueAnswerDuration;
	}

	public int getConsultToQueueRequestCount() {
		return consultToQueueRequestCount;
	}

	public void setConsultToQueueRequestCount(int consultToQueueRequestCount) {
		this.consultToQueueRequestCount = consultToQueueRequestCount;
	}

	public int getConsultToQueueRequestDuration() {
		return consultToQueueRequestDuration;
	}

	public void setConsultToQueueRequestDuration(int consultToQueueRequestDuration) {
		this.consultToQueueRequestDuration = consultToQueueRequestDuration;
	}

	public int getOutdialConsultToQueueRequestCount() {
		return outdialConsultToQueueRequestCount;
	}

	public void setOutdialConsultToQueueRequestCount(int outdialConsultToQueueRequestCount) {
		this.outdialConsultToQueueRequestCount = outdialConsultToQueueRequestCount;
	}

	public int getOutdialConsultToQueueRequestDuration() {
		return outdialConsultToQueueRequestDuration;
	}

	public void setOutdialConsultToQueueRequestDuration(int outdialConsultToQueueRequestDuration) {
		this.outdialConsultToQueueRequestDuration = outdialConsultToQueueRequestDuration;
	}

	public int getConsultToQueueCount() {
		return consultToQueueCount;
	}

	public void setConsultToQueueCount(int consultToQueueCount) {
		this.consultToQueueCount = consultToQueueCount;
	}

	public int getConsultToQueueDuration() {
		return consultToQueueDuration;
	}

	public void setConsultToQueueDuration(int consultToQueueDuration) {
		this.consultToQueueDuration = consultToQueueDuration;
	}

	public int getHoldCount() {
		return holdCount;
	}

	public void setHoldCount(int holdCount) {
		this.holdCount = holdCount;
	}

	public int getHoldDuration() {
		return holdDuration;
	}

	public void setHoldDuration(int holdDuration) {
		this.holdDuration = holdDuration;
	}

	public int getOutdialHoldCount() {
		return outdialHoldCount;
	}

	public void setOutdialHoldCount(int outdialHoldCount) {
		this.outdialHoldCount = outdialHoldCount;
	}

	public int getOutdialHoldDuration() {
		return outdialHoldDuration;
	}

	public void setOutdialHoldDuration(int outdialHoldDuration) {
		this.outdialHoldDuration = outdialHoldDuration;
	}

	public int getNotRespondedCount() {
		return notRespondedCount;
	}

	public void setNotRespondedCount(int notRespondedCount) {
		this.notRespondedCount = notRespondedCount;
	}

	public int getNotRespondedDuration() {
		return notRespondedDuration;
	}

	public void setNotRespondedDuration(int notRespondedDuration) {
		this.notRespondedDuration = notRespondedDuration;
	}

	public int getOutdialNotRespondedCount() {
		return outdialNotRespondedCount;
	}

	public void setOutdialNotRespondedCount(int outdialNotRespondedCount) {
		this.outdialNotRespondedCount = outdialNotRespondedCount;
	}

	public int getOutdialNotRespondedDuration() {
		return outdialNotRespondedDuration;
	}

	public void setOutdialNotRespondedDuration(int outdialNotRespondedDuration) {
		this.outdialNotRespondedDuration = outdialNotRespondedDuration;
	}

	public int getWrapupCount() {
		return wrapupCount;
	}

	public void setWrapupCount(int wrapupCount) {
		this.wrapupCount = wrapupCount;
	}

	public int getWrapupDuration() {
		return wrapupDuration;
	}

	public void setWrapupDuration(int wrapupDuration) {
		this.wrapupDuration = wrapupDuration;
	}

	public int getOutdialWrapupCount() {
		return outdialWrapupCount;
	}

	public void setOutdialWrapupCount(int outdialWrapupCount) {
		this.outdialWrapupCount = outdialWrapupCount;
	}

	public int getOutdialWrapupDuration() {
		return outdialWrapupDuration;
	}

	public void setOutdialWrapupDuration(int outdialWrapupDuration) {
		this.outdialWrapupDuration = outdialWrapupDuration;
	}

	public int getDisconnectedCount() {
		return disconnectedCount;
	}

	public void setDisconnectedCount(int disconnectedCount) {
		this.disconnectedCount = disconnectedCount;
	}

	public int getAgentToAgentTransferCount() {
		return agentToAgentTransferCount;
	}

	public void setAgentToAgentTransferCount(int agentToAgentTransferCount) {
		this.agentToAgentTransferCount = agentToAgentTransferCount;
	}

	public int getOutdialAgentToAgentTransferCount() {
		return outdialAgentToAgentTransferCount;
	}

	public void setOutdialAgentToAgentTransferCount(int outdialAgentToAgentTransferCount) {
		this.outdialAgentToAgentTransferCount = outdialAgentToAgentTransferCount;
	}

	public int getOutdialAgentTransferToQueueRequestCount() {
		return outdialAgentTransferToQueueRequestCount;
	}

	public void setOutdialAgentTransferToQueueRequestCount(int outdialAgentTransferToQueueRequestCount) {
		this.outdialAgentTransferToQueueRequestCount = outdialAgentTransferToQueueRequestCount;
	}

	public int getAgentTransferToQueueRequestCount() {
		return agentTransferToQueueRequestCount;
	}

	public void setAgentTransferToQueueRequestCount(int agentTransferToQueueRequestCount) {
		this.agentTransferToQueueRequestCount = agentTransferToQueueRequestCount;
	}

	public int getBlindTransferCount() {
		return blindTransferCount;
	}

	public void setBlindTransferCount(int blindTransferCount) {
		this.blindTransferCount = blindTransferCount;
	}

	public int getOutdialBlindTransferCount() {
		return outdialBlindTransferCount;
	}

	public void setOutdialBlindTransferCount(int outdialBlindTransferCount) {
		this.outdialBlindTransferCount = outdialBlindTransferCount;
	}

	public int getOutdialCount() {
		return outdialCount;
	}

	public void setOutdialCount(int outdialCount) {
		this.outdialCount = outdialCount;
	}

	public int getOutdialTransferCount() {
		return outdialTransferCount;
	}

	public void setOutdialTransferCount(int outdialTransferCount) {
		this.outdialTransferCount = outdialTransferCount;
	}

	public int getDisconnectedHoldCallsCount() {
		return disconnectedHoldCallsCount;
	}

	public void setDisconnectedHoldCallsCount(int disconnectedHoldCallsCount) {
		this.disconnectedHoldCallsCount = disconnectedHoldCallsCount;
	}

	public int getTransferCount() {
		return transferCount;
	}

	public void setTransferCount(int transferCount) {
		this.transferCount = transferCount;
	}

	public int getOutdialConsultTransferDuration() {
		return outdialConsultTransferDuration;
	}

	public void setOutdialConsultTransferDuration(int outdialConsultTransferDuration) {
		this.outdialConsultTransferDuration = outdialConsultTransferDuration;
	}

	public int getCallBackCount() {
		return callBackCount;
	}

	public void setCallBackCount(int callBackCount) {
		this.callBackCount = callBackCount;
	}

	public Object getLastActivityTime() {
		return lastActivityTime;
	}

	public void setLastActivityTime(Object lastActivityTime) {
		this.lastActivityTime = lastActivityTime;
	}

	public int getConsultToEpRequestedCount() {
		return consultToEpRequestedCount;
	}

	public void setConsultToEpRequestedCount(int consultToEpRequestedCount) {
		this.consultToEpRequestedCount = consultToEpRequestedCount;
	}

	public int getConsultToEpRequestedDuration() {
		return consultToEpRequestedDuration;
	}

	public void setConsultToEpRequestedDuration(int consultToEpRequestedDuration) {
		this.consultToEpRequestedDuration = consultToEpRequestedDuration;
	}

	public int getConsultToEpAnsweredCount() {
		return consultToEpAnsweredCount;
	}

	public void setConsultToEpAnsweredCount(int consultToEpAnsweredCount) {
		this.consultToEpAnsweredCount = consultToEpAnsweredCount;
	}

	public int getConsultToEpAnsweredDuration() {
		return consultToEpAnsweredDuration;
	}

	public void setConsultToEpAnsweredDuration(int consultToEpAnsweredDuration) {
		this.consultToEpAnsweredDuration = consultToEpAnsweredDuration;
	}

	public int getOutdialConsultToEpRequestedCount() {
		return outdialConsultToEpRequestedCount;
	}

	public void setOutdialConsultToEpRequestedCount(int outdialConsultToEpRequestedCount) {
		this.outdialConsultToEpRequestedCount = outdialConsultToEpRequestedCount;
	}

	public int getOutdialConsultToEpRequestedDuration() {
		return outdialConsultToEpRequestedDuration;
	}

	public void setOutdialConsultToEpRequestedDuration(int outdialConsultToEpRequestedDuration) {
		this.outdialConsultToEpRequestedDuration = outdialConsultToEpRequestedDuration;
	}

	public int getOutdialConsultToEpAnsweredCount() {
		return outdialConsultToEpAnsweredCount;
	}

	public void setOutdialConsultToEpAnsweredCount(int outdialConsultToEpAnsweredCount) {
		this.outdialConsultToEpAnsweredCount = outdialConsultToEpAnsweredCount;
	}

	public int getOutdialConsultToEpAnsweredDuration() {
		return outdialConsultToEpAnsweredDuration;
	}

	public void setOutdialConsultToEpAnsweredDuration(int outdialConsultToEpAnsweredDuration) {
		this.outdialConsultToEpAnsweredDuration = outdialConsultToEpAnsweredDuration;
	}

	public int getTotalReservationTime() {
		return totalReservationTime;
	}

	public void setTotalReservationTime(int totalReservationTime) {
		this.totalReservationTime = totalReservationTime;
	}

	public int getReservationCount() {
		return reservationCount;
	}

	public void setReservationCount(int reservationCount) {
		this.reservationCount = reservationCount;
	}
}
