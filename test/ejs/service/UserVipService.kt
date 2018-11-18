package com.pinjia.model

import org.springframework.stereotype.Service

@Service("UserVipService")
class UserVipService {

    companion object {
        private val logger = org.slf4j.LoggerFactory.getLogger(UserVipService::class.java)
    }
}
