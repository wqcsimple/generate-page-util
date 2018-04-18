package com.pinjia.model

import com.dix.base.core.Core
import com.dix.base.common.Const
import com.dix.base.exception.NotExistsException
import com.dix.base.model.BaseModel
import com.dix.base.model.Model
import com.fasterxml.jackson.annotation.JsonProperty

@Model(tableName = "message")
class Message : BaseModel() {

    @get:JsonProperty("id") var id: Long = 0L
    @get:JsonProperty("type") var type: Int = 0
    @get:JsonProperty("session_id") var sessionId: Long = 0L
    @get:JsonProperty("from_user_id") var fromUserId: Long = 0L
    @get:JsonProperty("to_user_id") var toUserId: Long = 0L
    @get:JsonProperty("content_type") var contentType: Int = 0
    @get:JsonProperty("content") var content: String = ""
    @get:JsonProperty("weight") var weight: Int = 0
    @get:JsonProperty("create_time") var createTime: Long = 0L
    @get:JsonProperty("update_time") var updateTime: Long = 0L
    

    override fun ID(): Long? {
        return id
    }

    override fun keys(): Array<String> {
        return arrayOf("id", "type", "session_id", "from_user_id", "to_user_id", "content_type", "content", "weight", "create_time", "update_time")
    }

    override fun basicKeys(): Array<String> {
        return arrayOf("id", "type", "session_id", "from_user_id", "to_user_id", "content_type", "content", "weight", "create_time", "update_time")
    }

    override fun detailKeys(): Array<String> {
        return arrayOf("id", "type", "session_id", "from_user_id", "to_user_id", "content_type", "content", "weight", "create_time", "update_time")
    }

    override fun process(model: Any, keys: Array<String>?): Map<String, Any>? {
        val map = Core.processModel(model, keys)

        if (map != null)
        {

        }

        return map
    }

    companion object {

        fun findById(id: Long): Message? {
            return Core.Q().findById(Message::class.java, id)
        }

        fun findOrFail(id: Long): Message {
            return findById(id) ?: throw NotExistsException()
        }

        fun getRawById(id: Long): Map<String, Any>? {
            val data = findById(id) ?: return null
            return data.process()
        }
    }
}